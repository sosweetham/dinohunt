import { TimeUnit } from "@valkey/valkey-glide";
import { betterAuth } from "better-auth";
import { captcha, username } from "better-auth/plugins";
import { surrealAdapter } from "surreal-better-auth";
import { db } from "../../stores/db";
import { kvsClient } from "../../stores/kvs";
import { dinoHuntConfig } from "../conf";
import { emailTransporter } from "../email";

export const auth = betterAuth({
    database: surrealAdapter(db),
    plugins: [
        username(),
        ...(dinoHuntConfig.nodeConfig.nodeEnv === "development" ||
        dinoHuntConfig.nodeConfig.nodeEnv === "test"
            ? []
            : [
                  captcha({
                      provider: "cloudflare-turnstile",
                      secretKey:
                          dinoHuntConfig.cloudflareConfig.turnstileSecretKey,
                  }),
              ]),
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false,
        sendResetPassword: async ({ user, url }) => {
            const extendedUser: typeof user & {
                username?: string;
                displayUsername?: string;
            } = user; // The plugin adds the username to the user object, but its not typed rn so this is a workaround.
            const html = `Hi ${user.name},
            You requested a password reset.
            If you did not request this, please ignore this email.
            ${
                extendedUser.username
                    ? `As a reminder, your username is: ${extendedUser.username}`
                    : ""
            }
            Click the link to reset your password: ${url}
            `;
            await emailTransporter.sendMail({
                from: "ham@mail.kodski.com",
                to: user.email,
                subject: "dinohunt - Reset your password",
                html,
            });
        },
        resetPasswordTokenExpiresIn: 3600, // 1 hour
        password: {
            hash: async (password: string) => {
                return await Bun.password.hash(password, {
                    algorithm: "argon2id",
                    memoryCost: 4,
                    timeCost: 3,
                });
            },
            verify: async (data: { hash: string; password: string }) => {
                return await Bun.password.verify(data.password, data.hash);
            },
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            const sendUrl = new URL(url);
            sendUrl.searchParams.set(
                "callbackURL",
                `${dinoHuntConfig.clientConfig.clientHost}/verified`,
            );
            const html = `Click the link to verify your email: ${sendUrl.toString()}`;

            await emailTransporter.sendMail({
                from: "ham@mail.kodski.com",
                to: user.email,
                subject: "dinohunt - Verify your email",
                html,
            });
        },
    },
    trustedOrigins: [dinoHuntConfig.clientConfig.clientHost],
    secondaryStorage: {
        get: async (key: string) => {
            const value = (await kvsClient.get(key))?.toString();
            return value ? value : null;
        },
        set: async (key, value, ttl) => {
            if (ttl)
                await kvsClient.set(key, value, {
                    expiry: { type: TimeUnit.Seconds, count: ttl },
                });
            else await kvsClient.set(key, value);
        },
        delete: async (key) => {
            await kvsClient.del([key]);
        },
    },
    basePath: "/api/v1/auth",
    user: {
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, url }) => {
                const html = `Click the link to verify your email: ${url}`;

                await emailTransporter.sendMail({
                    from: "ham@mail.kodski.com",
                    to: user.email,
                    subject: "Test Email",
                    html,
                });
            },
        },
    },
    socialProviders: {
        discord: {
            clientId: dinoHuntConfig.discordConfig.clientId,
            clientSecret: dinoHuntConfig.discordConfig.clientSecret,
        },
    },
});

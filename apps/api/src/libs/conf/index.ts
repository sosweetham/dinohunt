import { ClientConfig } from "./client.conf";
import { CloudflareConfig } from "./cloudflare.conf";
import { DbConfig } from "./db.conf";
import { DiscordConfig } from "./discord.conf";
import { KvsConfig } from "./kvs.conf";
import { NodeConfig } from "./node.conf";
import { SmtpConfig } from "./smtp.conf";

export class DinoHuntConfig {
    dbConfig: DbConfig;
    smtpConfig: SmtpConfig;
    nodeConfig: NodeConfig;
    cloudflareConfig: CloudflareConfig;
    clientConfig: ClientConfig;
    kvsConfig: KvsConfig;
    discordConfig: DiscordConfig;
    constructor() {
        this.dbConfig = new DbConfig(
            Bun.env.SURREAL_URL,
            Bun.env.SURREAL_NS,
            Bun.env.SURREAL_DB,
            Bun.env.SURREAL_USER,
            Bun.env.SURREAL_PASS,
        );
        this.smtpConfig = new SmtpConfig(
            Bun.env.SMTP_HOST,
            Bun.env.SMTP_PORT,
            Bun.env.SMTP_USER,
            Bun.env.SMTP_PASS,
        );
        this.nodeConfig = new NodeConfig(
            Bun.env.NODE_ENV,
            Bun.env.PLATFORM,
            Bun.env.PORT,
        );
        this.cloudflareConfig = new CloudflareConfig(
            Bun.env.TURNSTILE_SECRETKEY,
        );
        this.clientConfig = new ClientConfig(Bun.env.CLIENT_HOST);
        this.kvsConfig = new KvsConfig(
            Bun.env.VALKEY_HOST,
            Bun.env.VALKEY_PORT,
        );
        this.discordConfig = new DiscordConfig(
            Bun.env.DISCORD_CLIENT_ID,
            Bun.env.DISCORD_CLIENT_SECRET,
        )
    }
}

export const dinoHuntConfig = new DinoHuntConfig();
export { DbConfig } from "./db.conf";

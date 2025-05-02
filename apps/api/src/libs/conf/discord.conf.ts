export class DiscordConfig {
    clientId: string;
    clientSecret: string;
    constructor(discordClientId?: string, discordClientSecret?: string) {
        if (!discordClientId || !discordClientSecret) {
            throw new Error("Discord client ID and secret are required");
        }
        this.clientId = discordClientId;
        this.clientSecret = discordClientSecret;
    }
}

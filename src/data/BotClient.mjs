import { Client, GatewayIntentBits, Partials, Options, Collection } from "discord.js";
import { defaultConfigData } from "./defaultConfig.mjs";
import { MongoDatabase } from "./MongoDatabase.mjs";
import { alert } from "./Logger.mjs";
import YAML from "yaml";
import fs from "fs";

export default class BotClient extends Client {

    constructor(config) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildWebhooks,
            ],
            partials: [
                Partials.User,
                Partials.Message,
                Partials.GuildMember,
                Partials.ThreadMember,
                Partials.Channel,
                Partials.Reaction,
                Partials.GuildScheduledEvent,
            ],
            makeCache: Options.cacheWithLimits({
                ApplicationCommandManager: {
                    maxSize: -1,
                },
                GuildStickerManager: {
                    maxSize: -1,
                },
                ReactionManager: {
                    maxSize: -1,
                },
                PresenceManager: {
                    maxSize: -1,
                },
                MessageManager: {
                    maxSize: -1,
                },
            }),
            config,
        });

        this.config = YAML.parse(fs.readFileSync("./Config.yml", "utf8"));
        // this.colors = YAML.parse(fs.readFileSync("./Configurations/Colors.yml", "utf8"));

        this.yamlConfig = {
            discordToken: this.config.Discord.Token,
            prefix: this.config.Discord.Prefix,
            ownerID: this.config.Discord.OwnerID,
            mongoURI: this.config.Database.URI,
        };

        this.database = new MongoDatabase({ URI: this.yamlConfig.mongoURI, client: this });

        // Collections \\
        this.commands = new Collection();
        this.invites = new Collection();
        this.events = new Collection();


        this.init();
    };

    async init() {
        await this.ensureYamlConfig();
        
        await this.login(this.yamlConfig.discordToken).catch((err) => {
            console.log(alert(err, "defaultBarError"));
        });

    }

    async ensureYamlConfig() {
        if (this.yamlConfig.discordToken?.length < 10) this.yamlConfig.discordToken = defaultConfigData.discordToken;
        if (this.yamlConfig.prefix?.length < 1) this.yamlConfig.prefix = defaultConfigData.prefix;
        if (this.yamlConfig.ownerID?.length < 1) this.yamlConfig.ownerID = defaultConfigData.owners[0];

        for (const [key, value] of Object.entries(this.yamlConfig))
            if (!this.yamlConfig[key]?.length) this.yamlConfig[key] = defaultConfigData[key];
    };

}
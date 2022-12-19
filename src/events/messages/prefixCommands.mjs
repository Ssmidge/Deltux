import { Colors, Message, Client } from "discord.js";

export default {
    name: "messageCreate",
    once: false,
    rest: false,
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        // Ignore messages from bots \\
        if (message.author.bot) return;

        // Ignore messages that don't start with the prefix \\
        if (!message.content.startsWith(client.yamlConfig.prefix)) return;

        // Ignore messages that don't have anything after the prefix \\
        if (message.content === client.yamlConfig.prefix) return;

        // Split the message into an array \\
        const [cmd, ...args] = message.content.slice(client.yamlConfig.prefix.length).trim().split(/ +/);
        const commandName = cmd.toLowerCase() || cmd.shift().toLowerCase() || message.content.split(client.yamlConfig.prefix)[1].split(" ")[0];

        // Find command by name or alias \\
        try {
            const command = client.commands.get(commandName) || client.commands.filter(cmd => cmd.prefix && cmd.prefix.enabled).find(cmd => cmd.prefix.aliases && cmd.prefix.aliases.includes(commandName));
            if (!command || !command.prefix || !command.prefix.enabled) return;

            message.user = message.author;
            // Set the options to the arguments that were passed \\
            message.options = args;

            command.execute(message, client, args);
        } catch (err) {
            console.log(err);
        }
    }
};
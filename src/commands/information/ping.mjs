import { SlashCommandBuilder, Colors, ChatInputCommandInteraction, Client } from "discord.js";

export default {
    prefix: {
        enabled: true,
        aliases: ["ping", "pong"],
    },
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        // Current time \\
        const time = Date.now();
        const message = await interaction.reply({ content: "Pong!", ephemeral: true });

        // Edit the message to include the latency \\
        if (typeof interaction.ephemeral === "boolean")
            await setTimeout(() => interaction.editReply({ content: `Pong! Latency is ${time - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms` }), 500)
        else
            await setTimeout(() => message.edit({ content: `Pong! Latency is ${time - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms` }), 500);
   },
};
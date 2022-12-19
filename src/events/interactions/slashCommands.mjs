import { ChatInputCommandInteraction, Client } from "discord.js"

export default {
    name: "interactionCreate",
    once: false,
    rest: false,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
    */
    async execute(interaction, client) {
        // Ignore interactions from bots \\
        if (interaction.user.bot) return;

        // Ignore interactions that aren't slash commands \\
        if (!interaction.isCommand()) return;

        // Find command by name \\
        try {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({ content: "An error occurred while executing this command.", ephemeral: true });

            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            command.execute(interaction, client);
        } catch (err) {
            console.log(err);
        }
    }
};

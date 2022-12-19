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

        // Ignore interactions that aren't autocompletable commands \\
        if (!interaction.isAutocomplete()) return;

        // Find command by name \\
        try {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.respond({ content: "An error occurred while executing this command.", ephemeral: true });

            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            command.autoComplete(interaction, client);
        } catch (err) {
            console.log(err);
        }
    }
};

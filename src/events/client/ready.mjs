import { loadCommands } from "../../handlers/commandHandler.mjs";

export default {
    name: "ready",
    once: true,
    rest: false,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        // Database \\
        await client.database.connect();

        // Load Commands \\
        await loadCommands(client);

    },
}
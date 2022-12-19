import { loadCommands } from "../../handlers/commandHandler.mjs";

export default {
    name: "ready",
    once: true,
    rest: false,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        console.log(`Invite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands%20bot&permissions=8`);

        // Database \\
        await client.database.connect();

        // Load Commands \\
        await loadCommands(client);

    },
}
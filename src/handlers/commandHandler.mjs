import { loadFiles } from "../functions/fileLoader.mjs";
import { alert } from "../data/Logger.mjs";
import { ApplicationCommandType } from "discord.js";
import chalk from "chalk";

async function loadCommands(client) {
    await client.commands.clear();

    const commandArray = [];

    const Files = await loadFiles("commands");

    // Sort files in alphabetical order and by length
    Files.sort((a, b) => a.split("/").pop().split(".")[0].length - b.split("/").pop().split(".")[0] || a.split("/").pop().split(".")[0].localeCompare(b.split("/").pop().split(".")[0]));

    Files.forEach(async (file) => {
        const command = await import(`file://${file}`).then((command) => command.default).catch(() => console.log(file));

        command.category = command.category || file.split("/").slice(-2, -1)[0];
        if (!command.data.name) return await console.log(alert(`Command ${file.split("/").pop().split(".")[0]} has no name!`, "defaultBarError"));
        if (!command.data.description && command.data.type !== ApplicationCommandType.User) return await console.log(alert(`Command ${command.data.name} has no description!`, "defaultBarError"));

        await client.commands.set(command.data.name, command);
        await commandArray.push(command.data.toJSON());

        await console.log(chalk.cyan.bold(command.data.name) + chalk.white(" has been loaded as a ") + chalk.blue.bold("COMMAND"));

    });

    setTimeout(async () => await registerCommands(client, commandArray), 1000);


    return client.commands;
}

function registerCommands(client, commandArray) {
    client.application.commands.set(commandArray).then(() => {
        console.log(alert("Loaded Commands", "botInfo"));
    }).catch((err) => console.log(err));
}

export { loadCommands };

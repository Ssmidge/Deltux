import { loadFiles } from "../functions/fileLoader.mjs";
import { alert } from "../data/Logger.mjs";
import chalk from "chalk";
async function loadEvents(client) {
    await client.events.clear();

    const Files = await loadFiles("events");

    // Sort files in alphabetical order and by length
    Files.sort((a, b) => a.split("/").pop().split(".")[0].length - b.split("/").pop().split(".")[0] || a.split("/").pop().split(".")[0].localeCompare(b.split("/").pop().split(".")[0]));

    Files.forEach(async (file) => {
        const event = await import(`file://${file}`).then((event) => event.default);
        const fileName = file.split("/").pop().split(".")[0];

        const execute = (...args) => event.execute(...args, client);

        if (!event || !event.name) return console.log(alert(`Event ${fileName} has no name!`, "defaultBarError"));

        client.events.set(event.name, execute);


        if (event.rest)
            if (event.once) client.rest.once(event.name, execute);
            else client.rest.on(event.name, execute);
        else if (event.cluster) client.cluster.on(event.name, execute);
        else if (event.once) client.once(event.name, execute);
        else client.on(event.name, execute);
        
        console.log(`${chalk.green.bold(`${fileName}.js (${event.name})`)}${chalk.white(" has been loaded as an ")}${chalk.green.dim.bold("EVENT")}`);
    });
}

export { loadEvents };

import chalk from "chalk";
import packageJSON from "../../package.json" assert { type: "json" };

const version = packageJSON.version;
const botName = packageJSON.name.substring(0, 1).toUpperCase() + packageJSON.name.substring(1);
const Bar = "──────────────────────────────────────────────────────────";

/**
 * @param {String} string,
 * @returns Selectable Alert strings wrapped in error or announcement info
 */
export function alert(string, alertName) {
    const alertList = {
        databaseError: `${botName} ${chalk.white.bold(version)} | ${chalk.red.bold("Database: " + string)}`,
        defaultBar: `${Bar}\n`,
        defaultError: `${botName} ${chalk.white.bold(version)} | ${chalk.red.bold("Error: " + string)}`,
        defaultBarError: `${Bar}\n${botName} ${chalk.white.bold(version)} | ${chalk.red.bold(`Error: ${string}\n`)}${Bar}`,
        botInfoBar: `${Bar}\n${botName} ${chalk.white.bold(version)} | ${string}\n${Bar}`,
        botInfo: `${botName} ${chalk.white.bold(version)} | ${string}`,
        databaseInfo: `${botName} ${chalk.white.bold(version)} | ${chalk.greenBright.bold("Database: ")}${chalk.green(string)}`,
    };
    return alertList[alertName] ?? alertList.unknown;
};
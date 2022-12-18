import { loadEvents } from "./handlers/eventHandler.mjs";
import BotClient from "./data/BotClient.mjs";

// Import \\
const client = new BotClient();

// Handlers \\
loadEvents(client);


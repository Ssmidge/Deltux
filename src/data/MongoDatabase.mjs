// Imports \\
import { alert } from "./Logger.mjs";
import mongoose from "mongoose";

// Main \\
export class MongoDatabase {
    constructor(config) {
        this.config = config;
    }
    async connect() {
        console.log(alert("Connecting to database", "databaseInfo"));
        mongoose.connect(this.config.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log(alert(`Connected to MongoDB`, "databaseInfo"));
            return Promise.resolve({ error: false, message: "Connected to MongoDB" });
        }).catch((err) => {
            console.log(alert(`Error connecting to MongoDB!\n${err}`, "databaseError"));
            return Promise.resolve({ error: true, message: `Error connecting to MongoDB!\n${err}` });
        });
    };

    async disconnect() {
        mongoose.disconnect().then(() => {
            console.log(alert(`Disconnected from MongoDB", "databaseInfo`));
            return Promise.resolve({ error: false, message: "Disconnected from MongoDB" });
        }).catch((err) => {
            console.log(alert(`Error disconnecting from MongoDB!\n${err}`, "databaseError"));
            return Promise.reject({ error: true, message: `Error disconnecting from MongoDB!\n${err}` });
        });
    };

}
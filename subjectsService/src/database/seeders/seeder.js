/* eslint-disable no-console */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { seedSubjectsFaker } = require("./subjectsSeeder");

const { connect, connection, disconnect } = mongoose;
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
).replace("<USER>", process.env.MONGO_USER);

async function mainSeedingFunction() {
  try {
    await connect(DB);

    if (process.argv.includes("--fresh")) {
      await connection.dropDatabase();
    }
    await seedSubjectsFaker();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Disconnecting from database.");
    await disconnect();
  }
}

mainSeedingFunction().catch(console.error);

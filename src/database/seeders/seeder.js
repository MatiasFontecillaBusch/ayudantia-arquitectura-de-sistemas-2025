/* eslint-disable no-console */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const prisma = require("../prisma");
const { seedSubjectsFaker } = require("./subjectsSeeder");
const { seedUsersFaker } = require("./usersSeeder");

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
      await prisma.users.deleteMany();
    }
    await seedSubjectsFaker();
    await seedUsersFaker();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Disconnecting from database.");
    await disconnect();
    await prisma.$disconnect();
  }
}

mainSeedingFunction().catch(console.error);

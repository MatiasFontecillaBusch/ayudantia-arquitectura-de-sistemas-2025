/* eslint-disable no-console */
const dotenv = require("dotenv");
const prisma = require("../prisma");
const { seedUsersFaker } = require("./usersSeeder");

dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

async function mainSeedingFunction() {
  try {
    await connect(DB);

    if (process.argv.includes("--fresh")) {
      await prisma.users.deleteMany();
    }
    await seedUsersFaker();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Disconnecting from database.");
    await prisma.$disconnect();
  }
}

mainSeedingFunction().catch(console.error);

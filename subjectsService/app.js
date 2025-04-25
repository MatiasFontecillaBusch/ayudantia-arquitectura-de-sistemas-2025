/* eslint-disable import/first */
/* eslint-disable no-console */
const { config } = require("dotenv");
const { connect } = require("mongoose");
const { ServerCredentials, Server } = require("@grpc/grpc-js");
const { loadProto } = require("./src/utils/loadProto");
const subjectsService = require("./src/services/subjectsService");
const initializeQueueConsumers = require("./src/queue");

const environments = {
  development: "Desarrollo",
  production: "Producción",
};

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Apagando el servidor...");
  console.log(err.name, err.message);
  process.exit(1);
});

config({ path: "./.env" });

const server = new Server();

const DB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
).replace("<USER>", process.env.MONGO_USER);

connect(DB).then(() => console.log("✓ Conexión a base de datos exitosa"));
initializeQueueConsumers().then(() =>
  console.log("✓ Conexión con RabbitMQ exitosa.")
);

const subjectsProto = loadProto("subjects");
server.addService(subjectsProto.Subjects.service, subjectsService);

server.bindAsync(
  `${process.env.SERVER_URL}:${process.env.PORT || 3000}`,
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("Server failed to bind:", error);
    } else {
      console.log(
        `- Entorno:      ${environments[process.env.NODE_ENV || "development"]}`
      );
      console.log(`- Puerto:       ${port}`);
      console.log(
        `- URL:          ${process.env.SERVER_URL || "localhost"}:${port}`
      );
    }
  }
);

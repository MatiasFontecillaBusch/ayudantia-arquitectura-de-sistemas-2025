/* eslint-disable import/first */
/* eslint-disable no-console */
const { config } = require("dotenv");
const { ServerCredentials, Server } = require("@grpc/grpc-js");
const { loadProto } = require("./src/utils/loadProto");
const usersService = require("./src/services/usersService");

const environments = {
  development: "Desarrollo",
  production: "Producción",
};


config({ path: "./.env" });

const server = new Server();

const usersProto = loadProto("users");
server.addService(usersProto.Users.service, usersService);

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

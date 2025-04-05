const { credentials } = require("@grpc/grpc-js");
const { loadProto } = require("./src/utils/loadProto");
const { config } = require("dotenv");

config();

const loadClients = (app) => {
  const userProto = loadProto("users");
  app.locals.usersClient = new userProto.Users(
    process.env.USERS_SERVICE_URL,
    credentials.createInsecure()
  );
  const subjectsProto = loadProto("subjects");
  app.locals.subjectsClient = new subjectsProto.Subjects(
    process.env.SUBJECTS_SERVICE_URL,
    credentials.createInsecure()
  );
};

module.exports = loadClients;

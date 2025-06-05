const { config } = require("dotenv");
const express = require("express");
const { connect } = require("mongoose");
const morgan = require("morgan");
const globalErrorMiddleware = require("./src/middlewares/globalErrorMiddleware");
const usersRouter = require("./src/routes/usersRouter");
const loadClients = require("./grpcClient");
const subjectsRouter = require("./src/routes/subjectsRouter");

config({ path: ".env" });

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

loadClients(app);

app.use("/subjects", subjectsRouter);
app.use("/users", usersRouter);

app.use(globalErrorMiddleware);

if (require.main === module) {
  const server = app.listen(process.env.PORT, () => {
    console.log(`- Entorno:      ${process.env.NODE_ENV}`);
    console.log(`- Puerto:       ${process.env.PORT}`);
    console.log(`- URL:          http://localhost:${process.env.PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Apagando el servidor...");
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED. Apagando el servidor.");
    server.close(() => {
      console.log("Servidor apagado!");
    });
  });
}

module.exports = app;

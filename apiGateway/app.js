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

app.listen(process.env.PORT, () => {
  console.log(`- Entorno:      ${process.env.NODE_ENV}`);
  console.log(`- Puerto:       ${process.env.PORT}`);
  console.log(`- URL:          http://localhost:${process.env.PORT}`);
});

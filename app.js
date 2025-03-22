const { config } = require("dotenv");
const express = require("express");
const { connect } = require("mongoose");
const morgan = require("morgan");
const subjectsRouter = require("./src/modules/subjects/routers/subjectsRouter");
const globalErrorMiddleware = require("./src/middlewares/globalErrorMiddleware");
const usersRouter = require("./src/modules/users/routes/usersRouter");

config({ path: ".env" });

const DB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
).replace("<USER>", process.env.MONGO_USER);

connect(DB).then(() => console.log("✓ Conexión a base de datos exitosa"));

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.use("/subjects", subjectsRouter);
app.use("/users", usersRouter);

app.use(globalErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`- Entorno:      ${process.env.NODE_ENV}`);
  console.log(`- Puerto:       ${process.env.PORT}`);
  console.log(`- URL:          http://localhost:${process.env.PORT}`);
});

const express = require("express");
const morgan = require("morgan");
const subjectsRouter = require("./src/routers/subjectsRouter");

const PORT = 3000;
const environment = "Desarrollo";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});


app.use("/subjects", subjectsRouter);

app.listen(PORT, () => {
  console.log(`- Entorno:      Desarrollo`);
  console.log(`- Puerto:       ${PORT}`);
  console.log(`- URL:          http://localhost:${PORT}`);
});

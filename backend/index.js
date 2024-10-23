const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const ConnectionDB = require("./Config/database");
const router = require("./routes/transactionroute");
const swaggerUi = require("swagger-ui-express");
const Yaml = require("yamljs");
dotenv.config();

ConnectionDB();
const app = express();

const corsOptions = {
  origin: "*", 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const yamlFilePath = "./api.yml";
const swaggerJSDocs = Yaml.load(yamlFilePath);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDocs));

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("Server at Running", process.env.PORT);
});

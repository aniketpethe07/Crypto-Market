const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true
};

app.use(cors(corsOptions));

dotenv.config();
connectDb();

app.use(express.json());

app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/apiRoutes"));

const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Server is running at ${port}`);
});

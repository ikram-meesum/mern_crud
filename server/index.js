const express = require("express");
const app = express();

const connectDB = require("./db");
connectDB();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/userRoutes"));

app.listen(5000, () => console.log("Server is running on port 5000"));

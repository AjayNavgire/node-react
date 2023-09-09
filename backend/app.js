const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middleware/error");

app.use(express.json())
app.use(cookieParser())

// Route Imports
const user = require("./routes/userRoute");
const job = require("./routes/jobRoute");

app.use("/api/v1",user);
app.use("/api/v1",job);

// Middleware for Errors
app.use(errorMiddleware)


module.exports = app;
const app = require("./app");
const dotenv = require("dotenv");
const {script} = require("./controller/scriptController")
const connectDatabase = require("./configration/database")
// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

// Config

dotenv.config({ path: "./configration/config.env" });

// Connecting to database
connectDatabase();

//un comment below script function for script to query a third-party API and store the results in MongoDB.
// script();

let PORT = process.env.PORT

const server = app.listen(PORT, () => {

    console.log(`Server is working on http://localhost:${PORT}`)
})


// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})
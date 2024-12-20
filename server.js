const mongoose = require('mongoose');
const next = require("next");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV !== "production"; // If it's not production, run in development mode
const nextServer = next({ dev }); // Initialize Next.js server
const handle = nextServer.getRequestHandler(); // Get the request handler from Next.js
dotenv.config({ path: "./config.env" }); // Load environment variables
const app = require("./app"); // Import your Express app

// MongoDB connection
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Set the port for the server to listen on
const port = process.env.PORT || 3000;

// Prepare and start the Next.js app
nextServer.prepare().then(() => {
    // Handling all requests with Next.js request handler
    app.get("*", (req, res) => {
        return handle(req, res);
    });

    // Start the Express app to listen for incoming requests
    app.listen(port, () => {
        console.log(`App running on port ${port} ...`);
    });
});

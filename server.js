const http = require('http');
const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT || 3300;

// Import DB
const connectDB = require('./db/connect');

const server = http.createServer(app);

async function startServer(){
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
}

// Start Server
startServer();
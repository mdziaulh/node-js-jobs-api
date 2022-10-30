const http = require('http');
const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT || 3300;

const server = http.createServer(app);

function startServer(){
    try {
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
}

// Start Server
startServer();
const http = require('http')
const port = 8080

const webServer = require('./services/web-server.js');
const fs = require('fs');
const log = require('electron-log');
const path = require('path');
const express = require('express');
const logPath = path.join(__dirname, './RestMenu.log');
log.transports.file.level = 'info';
log.transports.file.file = logPath;
const app = express()
app.set('view engine', 'ejs')

const defaultThreadPoolSize = 50;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE =  defaultThreadPoolSize;


//This method is to Start the Node Application
async function startup() {
    await fs.writeFile(logPath, '', function(){});
    log.info('Starting a New Session');
    log.info('Starting Application');
    
    try {
        log.info('Initializing web server module');
        await webServer.initialize();
    } catch (err) {
        log.error(err);
        process.exit(1); // Non-zero failure code
    }
}
startup();

/* 
// Create a server object:
const server = http.createServer(function (req, res) {
  
    // Write a response to the client
    res.write('Hello World')
  
    // End the response 
    res.end()
})
  
// Set up our server so it will listen on the port
server.listen(port, function (error) {
  
    // Checking any error occur while listening on port
    if (error) {
        console.log('Something went wrong', error);
    }
    // Else sent message of listening
    else {
        console.log('Server is listening on port' + port);
    }
}) */
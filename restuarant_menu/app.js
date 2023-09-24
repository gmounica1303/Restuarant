const http = require('http')
const port = 8080
const webServer = require('./services/web-server.js');
const fs = require('fs');
const log = require('electron-log');
const path = require('path');
const express = require('express');
const logPath = path.join(__dirname, './RestMenu.log');
log.transports.file.level = 'info';
log.transports.file = logPath;

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
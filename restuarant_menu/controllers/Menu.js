const log = require('electron-log');
const path = require('path');
const fs=require('fs');
const emoji= require('node-emoji');
const webServerConfig = require('../config/web-server');
const logPath = path.join(__dirname, './../RestMenu.log');
log.transports.file.level = 'info';
log.transports.file = logPath;

//This function receives the call and sends file data
async function getMenu(req, res) {  
    log.info('Getting Rest Menu..');
    try{
       const happy = emoji.get('smile');
       const data = fs.readFileSync( './menufile/RestMenu.txt', 'utf8');
        return res.json({
            'message': `Menu transfer success ${happy}!!! `,
            'data': data
            })
    }
    catch(err)
    {
        log.error('Error in getting MENU'+err);
        return res.status(404).json({
            'message': `Couldn't fetch menu data.Please try again!!`,
            
            })
        
    }
  }
  module.exports.getMenu = getMenu;
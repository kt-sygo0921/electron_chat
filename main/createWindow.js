import {BrowserWindow} from 'electron';

let mainWindow;

export default function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL(`file://${__dirname}/../view/html/index.html`);
    
    mainWindow.on('closed',function(){
        mainWindow = null;
    });
}
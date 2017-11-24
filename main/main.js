import {app} from 'electron';
import createWindow from './createWindow';
import setAppMenu from './AppMenu';

let mainWindow;


app.on('ready',()=>{
    setAppMenu();
    createWindow();
});

app.on('window-all-closed',function(){
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function(){
    if(mainWindow === null) {
        createWindow();
    }
});
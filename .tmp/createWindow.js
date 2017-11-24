'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createWindow;

var _electron = require('electron');

var mainWindow = void 0;

function createWindow() {
    mainWindow = new _electron.BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL('file://' + __dirname + '/../view/html/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
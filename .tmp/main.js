'use strict';

var _electron = require('electron');

var _createWindow = require('./createWindow');

var _createWindow2 = _interopRequireDefault(_createWindow);

var _AppMenu = require('./AppMenu');

var _AppMenu2 = _interopRequireDefault(_AppMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainWindow = void 0;

_electron.app.on('ready', function () {
    (0, _AppMenu2.default)();
    (0, _createWindow2.default)();
});

_electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        _electron.app.quit();
    }
});

_electron.app.on('activate', function () {
    if (mainWindow === null) {
        (0, _createWindow2.default)();
    }
});
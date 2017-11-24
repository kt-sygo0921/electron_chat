import {app,Menu} from 'electron';
import createWindow from './createWindow';

function setAppMenu() {
    const templete = [
        {
            label: 'ファイル',
            submenu: [
                {label:'新規ウィンドウ',accelerator: 'CmdOrCtrl+N',click:createWindow},
                {type:'separator'},
                {label: '閉じる',accelerator: 'CmdOrCtrl+W',role:'close'}
            ]
        },
        {
            label: '編集',
            submenu:[
                {label:'コピー',accelerator: 'CmdOrCtrl+C',role:'copy'},
                {label:'ペースト',accelerator: 'CmdOrCtrl+V',role:'paste'},
                {label:'カット',accelerator:'CmdOrCtrl+X',role:'cut'},
                {label:'全選択',accelerator:'CmdOrCtrl+A',role:'selectall'}
            ]
        },
        {
            label: '表示',
            submenu: [
                {
                    label:'再読込み',
                    accelerator: 'CmdOrCtrl+R',
                    click:(item, focusedWindow) => focusedWindow && focusedWindow.reload()
                },
                {
                    label: '開発者ツールを開く',
                    accelerator: process.platform === 'darwin'?'Alt+Command+I':'Ctrl+Shift+I',
                    click:(item,focusedWindow)=>focusedWindow && focusedWindow.toggleDevTools()
                }
            ]
        }
    ];
    //macOS特有の処理
    if(process.platform === 'darwin') {
        //テンプレート先頭にメインメニューを追加
        templete.unshift({
            label: app.getName(),
            submenu:[
                {role:'about'},
                {type:'separator'},
                {role:'services',submenu:[]},
                {type:'separator'},
                {role:'hide'},
                {role:'hideothers'},
                {role:'unhide'},
                {type:'separator'},
                {role:'quit'}
            ]
        });
        //テンプレート末尾にウィンドウメニューを追加
        templete.push({
            role: 'window',
            submenu:[
                {role:'minimize'},
                {role:'zoom'}
            ]
        });
    }
    //テンプレートからMenuオブジェクトを作成
    const appMenu = Menu.buildFromTemplate(templete);
    
    //作成したMenuオブジェクトをアプリケーションに設定
    Menu.setApplicationMenu(appMenu);
}

export default setAppMenu;
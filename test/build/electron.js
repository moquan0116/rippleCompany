// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const fs = require('fs');
const crypto = require('crypto');
const keypairs = require('ripple-keypairs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1100, height: 800})

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  /*mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true
  }))*/
  mainWindow.loadURL('http://192.168.124.5:8080');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
    ipc.on('vue-init', (event, arg) => {
        event.sender.send('init')
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
testSaveTxt();
testOpenTxt();
decryptFile();
function testSaveTxt() {
    ipc.on('save-dialog', (event, _file) => {
        let base = app.getPath('home');
        const options = {
            title: '保存文件',
            defaultPath: base+'\\'+_file,
            filters: [
                {name: 'Custom File Type', extensions: ['txt']}
            ]
        }
        dialog.showSaveDialog(options, (filename) => {
            event.sender.send('in-reg', filename)
        })
    })

    ipc.on('encrypt-ripple', (event, data)=>{
        writeFile(data);
    })
    ipc.on('seedWallet', (event, data)=>{
        let account = createWalletFromSeed(data.secret);
        data.account = account;
        writeFile(data).then(function (res) {
            console.log(res);
            event.sender.send('seedWalletCreateOk', JSON.stringify(res));
        }).catch(function (err) {
            if(err){
                event.sender.send('seedWalletCreateOk', -1);
            }
        })
    })

}
function testOpenTxt() {
    ipc.on('open-dialog', (event) => {
        let base = app.getPath('home');
        const options = {
            title: '打开文件',
            defaultPath: base,
            properties: ['openFile'],
            filters: [
                {name: 'Custom File Type', extensions: ['txt']},
            ]
        }
        dialog.showOpenDialog(options, (filePaths ) => {
            event.sender.send('in-open', filePaths);
        })
    })
}
function decryptFile() {
    ipc.on('decrypt', (event, data) => {
        let read = readFile(data.path);
        read.then(function (res) {
            return res;
        }).then(function (res) {
            event.sender.send('decrypt-ok', aesDecrypt(res, data.pwd));
        }).catch(function (err) {
            console.log(err);
        });
    })
}

function readFile(fileName){
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

}

function writeFile(data) {
    let encText = aesEncrypt(JSON.stringify(data.account), data.pwd);
    return new Promise(function (resolve, reject) {
        fs.writeFile(data.file, encText,(err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

//加密
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
//解密
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    try {
        return decrypted += decipher.final('utf8');
    } catch (err) {
        // console.error('Authentication failed!'+err);
        return false;
    }
}
function aesDecryptPro(encrypted, key) {
    return new Promise(function (resolve, reject) {
        const decipher = crypto.createDecipher('aes192', key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        resolve(decrypted);
    });
}

function createWalletFromSeed(secret) {
    const keypair = keypairs.deriveKeypair(secret);
    const address = keypairs.deriveAddress(keypair.publicKey);
    return {
        address,
        secret
    };
}


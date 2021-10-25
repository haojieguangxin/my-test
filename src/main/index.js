'use strict'

import { app, BrowserWindow, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/`
    : `file://${__dirname}/index.html`

function createMenu (mainWindow) {
    const template = [
        {
            label: '首页',
            submenu: [
                {
                    label: '首页',
                    click () {
                        mainWindow.webContents.send('href', 'landing-page')
                    }
                }
            ]
        },
        {
            label: '代码自动化',
            submenu: [
                {
                    label: '代码生成',
                    click () {
                        mainWindow.webContents.send('href', 'codeGenerate')
                    }
                }
            ]
        },
        {
            label: '配置项',
            submenu: [
                {
                    label: 'swagger配置',
                    click () {
                        mainWindow.webContents.send('href', 'swaggerConfig')
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:'
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true // Electron 10的重大变更，默认这个设置为false，导致我们引用remote的时候是undefined
        }
    })

    createMenu(mainWindow)

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

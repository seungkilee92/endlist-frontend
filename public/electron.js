'use strict'
const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

let mainWindow                  // Saves a global reference to mainWindow so it doesn't get garbage collected
app.on('ready', createWindow)   // Called when electron has initialized

// This will create our app window, no surprise there
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 550,
        minHeight: 550,
        titleBarStyle: "hidden"
    })

    // Display the index.html file
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // Open dev tools by default so we can see any console errors
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

/* Mac Specific things */

// When you close all the windows on a non-mac OS it quits the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit() }
})

// If there is no mainWindow it creates one (like when you click the dock icon)
app.on('activate', () => {
    if (mainWindow === null) { createWindow() }
})
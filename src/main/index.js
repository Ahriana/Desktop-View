import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { createWallpaper } from './functions/displays'
import fs from 'fs'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow// , dock
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

async function checkDir () {
  const home = app.getPath('home')
  const save = join(home, 'wallpaper-view')

  await fs.promises.access(save, fs.constants.F_OK).catch(async () => {
    await fs.promises.mkdir(save)
  })
}

function createWindow () {
  mainWindow = new BrowserWindow({ height: 563, useContentSize: true, show: false, width: 1000 })
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => { mainWindow = null })

  mainWindow.on('close', (event) => {
    if (!app.closing) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })
}

app.on('ready', ready)
app.on('activate', () => { if (mainWindow === null) { createWindow() } else { mainWindow.show() } })

// const contextMenu = Menu.buildFromTemplate([{
//   label: 'Quit',
//   click: () => { app.closing = true; app.quit() }
// }])

async function ready () {
  await checkDir()
  createWindow()
  // dock = new Tray(join(__dirname, '..', '..', 'build', 'icons', 'icon.png'))
  // dock.setToolTip('Desktop View')
  // dock.setContextMenu(contextMenu)
  // dock.on('click', () => !mainWindow.isVisible() || mainWindow.isMinimized() ? mainWindow.show() : mainWindow.hide())
  createWallpaper('1288107033')
}

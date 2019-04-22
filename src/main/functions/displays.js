import { app, screen, BrowserWindow } from 'electron'
import { join } from 'path'

const save = join(app.getPath('home'), 'wallpaper-view')
let wpWindow

// 1288107033
function createWallpaper (name) {
  const options = screen.getPrimaryDisplay().bounds
  options.frame = false
  options.resizable = false
  options.movable = false
  options.skipTaskbar = true
  options.enableLargerThanScreen = true
  options.webPreferences = { nodeIntegration: false }
  options.type = 'desktop'
  const winURL = `file://${join(save, name, 'index.html')}`

  console.log(winURL)
  wpWindow = new BrowserWindow(options)
  wpWindow.setIgnoreMouseEvents(true, { forward: true })
  wpWindow.loadURL(winURL)
  wpWindow.on('closed', () => { wpWindow = null })
  wpWindow.on('ready-to-show', () => { wpWindow.show() })
}

function createWidget () {

}

export { createWallpaper, createWidget }

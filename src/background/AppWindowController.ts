import { BrowserWindow } from 'electron'

import ForegroundClient from 'background/ForegroundClient'


let appWindow: BrowserWindow

export default {

    init(newAppWindow: BrowserWindow) {
        appWindow = newAppWindow
    },

    getAppWindow(): BrowserWindow {
        return appWindow
    },

    toggleMaximized() {
        if (appWindow.isMaximized()) {
            appWindow.unmaximize()
        } else {
            appWindow.maximize()
        }
    },

    toggleFullScreen() {
        const isFullScreen = !appWindow.isFullScreen()
        ForegroundClient.onFullScreenChange(isFullScreen)
            // There are also event handlers in `background/entry.ts` which will set this
            // But we set it a little bit earlier, so the UI adjusts faster
            // (We can't remove the event handlers in `background/entry.ts` because there are other ways to toggle full screen)
        appWindow.setFullScreen(isFullScreen)
    }

}

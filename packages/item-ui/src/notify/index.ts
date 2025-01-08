import type { App } from 'vue'
import Notify from './index.vue'
import NotifySdk from './notifySdk.vue'

Notify.install = (app: App) => {
  app.component('INotify', Notify)
}

NotifySdk.install = (app: App) => {
  app.component('INotifySdk', NotifySdk)
}

export {
  Notify,
  NotifySdk
} 

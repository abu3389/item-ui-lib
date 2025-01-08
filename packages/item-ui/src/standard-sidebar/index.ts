import type { App } from 'vue'
import StandardSidebar from './index.vue'

StandardSidebar.install = (app: App) => {
  app.component('IStandardSidebar', StandardSidebar)
}

export default StandardSidebar

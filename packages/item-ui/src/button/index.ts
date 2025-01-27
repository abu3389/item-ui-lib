import type { App } from 'vue'
import Button from './button.vue'

Button.install = (app: App) => {
  app.component('IButton', Button)
}

export default Button

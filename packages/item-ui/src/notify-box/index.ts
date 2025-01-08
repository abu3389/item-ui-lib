import type { App } from "vue";
import NotifyBox from "./index.vue";

NotifyBox.install = (app: App) => {
  app.component("INotifyBox", NotifyBox);
};

export default NotifyBox;

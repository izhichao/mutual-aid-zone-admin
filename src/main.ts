import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';
import './style/index.less';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as any);
}
app.use(ElementPlus);
app.use(router);
app.mount('#app');

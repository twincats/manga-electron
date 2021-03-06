import { createApp } from 'vue';
import App from '/@/App.vue';
import router from '/@/router';

import { ElButton, ElIcon } from 'element-plus';

import 'virtual:windi.css';
import '/@/style/global.css';

const app = createApp(App);

app.use(router);

app.component(ElButton.name, ElButton);
app.component(ElIcon.name, ElIcon);

app.mount('#app');

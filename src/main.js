import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from './router';
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

createApp(App).use(router).mount('#app')

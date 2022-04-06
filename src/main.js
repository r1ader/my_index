import { createApp } from 'vue'
import App from './App.vue'
import { CURSOR_WRAP } from "./const/symbol";
import { beforeMounted } from "./global";

const app = createApp(App)
beforeMounted(app)
app.mount('#app')

// todo mobile page
//  forbidden click event before showing

// todo use rxjs

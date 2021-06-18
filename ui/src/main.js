import {
  createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from '@/utils/message.plugin';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import Loader from "@/components/app/Loader";

createApp(App)
  .use(router)
  .use(store)
  .use(messagePlugin)
  .component('Loader', Loader)
  .mount('#app')

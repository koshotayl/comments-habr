import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft ,faUndo,faEdit,faTrash, faSave} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)
library.add(faUndo)
library.add(faEdit)
library.add(faTrash)
library.add(faSave)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

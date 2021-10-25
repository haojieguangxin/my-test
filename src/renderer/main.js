import Vue from 'vue'
import axios from 'axios'

import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import HosjoyUI from 'hosjoy-ui'
import 'hosjoy-ui/lib/hosjoy-ui.css'
import router from './router'
import basicTable from '@/common/CommonTable'
import '@/assets/style/common.scss'
import VueDND from 'awe-dnd'

Vue.use(VueDND)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(HosjoyUI)
Vue.component(
    'basicTable', basicTable
)

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    template: '<App/>'
}).$mount('#app')

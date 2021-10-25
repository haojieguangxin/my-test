import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Default.vue'
Vue.use(Router)

const { ipcRenderer } = require('electron')

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default
        },
        {
            path: '/config/swagger',
            name: 'swaggerConfig',
            component: require('@/components/config/swagger').default
        },
        {
            path: '/',
            name: 'code',
            component: Layout,
            children: [
                {
                    path: 'code',
                    name: 'codeGenerate',
                    component: () => import('@/components/code/index')
                }
            ]
        }
    ]
})

ipcRenderer.on('href', (event, arg) => {
    if (arg) {
        router.push({ name: arg })
    } else {
        router.push({name: 'landing-page'})
    }
})

export default router

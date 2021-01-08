import Vue from 'vue'
import Router from 'vue-router'

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
            path: '/code',
            name: 'codeGenerate',
            component: () => import('@/components/code/index')
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

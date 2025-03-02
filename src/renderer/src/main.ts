import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-GB'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'
import './styles/main.scss'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import Router from './router'

const pinia = createPinia()
const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  iconSet: quasarIconSet,
  config: {
    dark: true
  }
})
myApp.use(Router)
myApp.use(pinia)

myApp.mount('#app')

import components from './components'
import '../assets/css/style.css'

const plugins = {
    install(Vue){
        Vue.use(components)
    }
}

export default plugins;
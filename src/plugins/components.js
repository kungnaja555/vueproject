import Sidebar from '../components/Sidebar'
import BlogDetailFaculty from '../components/BlogDetailFaculty'
import ButtonAdd from '../components/ButtonAdd'
import TablePundit from '../components/TablePundit'
import DialogsFaculty from '../components/Dialogs/Faculty'
import DialogsMajor from '../components/Dialogs/Major'
import DialogsPundit from '../components/Dialogs/Pundit'
import DialogsRehearsal from '../components/Dialogs/Rehearsal'
import DialogsQueue from '../components/Dialogs/Queue'
import BlogRehearsal from '../components/BlogRehearsal'

const components = {
    install(Vue){
        Vue.component(Sidebar.name, Sidebar)
        Vue.component(BlogDetailFaculty.name, BlogDetailFaculty)
        Vue.component(ButtonAdd.name, ButtonAdd)
        Vue.component(TablePundit.name, TablePundit)
        Vue.component(DialogsFaculty.name, DialogsFaculty)
        Vue.component(DialogsMajor.name, DialogsMajor)
        Vue.component(DialogsPundit.name, DialogsPundit)
        Vue.component(DialogsRehearsal.name, DialogsRehearsal)
        Vue.component(DialogsQueue.name, DialogsQueue)
        Vue.component(BlogRehearsal.name, BlogRehearsal)
    }
}

export default components;

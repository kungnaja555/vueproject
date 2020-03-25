import Sidebar from '../components/Sidebar'
import BlogDetailFaculty from '../components/BlogDetailFaculty'
import ButtonAdd from '../components/ButtonAdd'
import TablePundit from '../components/TablePundit'
import DialogsFaculty from '../components/Dialogs/Faculty'
import DialogsPundit from '../components/Dialogs/Pundit'
import DialogsRehearsal from '../components/Dialogs/Rehearsal'
import DialogsQueue from '../components/Dialogs/Queue'
import BlogRehearsal from '../components/BlogRehearsal'
import TimeTable from '../components/TimeTable'
import SideMenu from '../components/SideMenu'
import CardListRehearsal from '../components/CardListRehearsal'
import ListRehearsal from '../components/Dialogs/ListRehearsal'

const components = {
    install(Vue){
        Vue.component(Sidebar.name, Sidebar)
        Vue.component(BlogDetailFaculty.name, BlogDetailFaculty)
        Vue.component(ButtonAdd.name, ButtonAdd)
        Vue.component(TablePundit.name, TablePundit)
        Vue.component(DialogsFaculty.name, DialogsFaculty)
        Vue.component(DialogsPundit.name, DialogsPundit)
        Vue.component(DialogsRehearsal.name, DialogsRehearsal)
        Vue.component(DialogsQueue.name, DialogsQueue)
        Vue.component(BlogRehearsal.name, BlogRehearsal)
        Vue.component(TimeTable.name, TimeTable),
        Vue.component(SideMenu.name, SideMenu)
        Vue.component(ListRehearsal.name, ListRehearsal)
        Vue.component(CardListRehearsal.name, CardListRehearsal)
    }
}

export default components;

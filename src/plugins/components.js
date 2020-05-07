import Sidebar from '../components/Sidebar'
import CardRehearsal from '../components/CardRehearsal'
import DialogsFaculty from '../components/Dialogs/Faculty'
import CardReportSet from '../components/CardReportSet'
import DialogsSet from '../components/Dialogs/Set'
import DialogsPundit from '../components/Dialogs/Pundit'
import DialogsDelete from '../components/Dialogs/Delete'
import CardListSet from '../components/CardListSet'

const components = {
    install(Vue) {
        Vue.component(Sidebar.name, Sidebar)
        Vue.component(CardRehearsal.name, CardRehearsal)
        Vue.component(DialogsFaculty.name, DialogsFaculty)
        Vue.component(DialogsPundit.name, DialogsPundit)
        Vue.component(DialogsSet.name, DialogsSet)
        Vue.component(DialogsDelete.name, DialogsDelete)
        Vue.component(CardReportSet.name, CardReportSet),
        Vue.component(CardListSet.name, CardListSet)
    }
}

export default components;

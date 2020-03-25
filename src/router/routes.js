import Faculty from '../pages/Faculty'
import Pundit from '../pages/Pundit'
import Rehearsal from '../pages/Rehearsal'
import Time from '../pages/Time'
import Start from '../pages/Start'
import ListReahearsal from '../pages/ListReahearsal'
import StorageTimeFac from '../pages/StorageTimeFac'
import StorageTimeSet from '../pages/StorageTimeSet'
import Major from '../pages/Major'

const routes = [
    {
        path: '/faculty',
        name: 'faculty',
        component: Faculty
    },
    {
        path: '/pundit',
        name: 'pundit',
        component: Pundit
    },
    {
        path: '/rehearsal',
        name: 'rehearsal',
        component: Rehearsal
    },
    {
        path: '/time',
        name: 'time',
        component: Time
    },
    {
        path: '/start',
        name: 'start',
        component: Start
    },
    {
        path: '/listrehearsal/:id',
        name: 'listrehearsal',
        component: ListReahearsal
    },
    {
        path: '/storagetimefac',
        name: 'storagetimefac',
        component: StorageTimeFac
    },
    {
        path: '/storagetimeset',
        name: 'storagetimeset',
        component: StorageTimeSet
    },
    {
        path: '/major/:id',
        name: 'major',
        component: Major
    },
]

export default routes;


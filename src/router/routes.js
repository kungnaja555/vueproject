import Faculty from '../pages/Faculty'
import Pundit from '../pages/Pundit'
import Rehearsal from '../pages/Rehearsal'
import Time from '../pages/Time'

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
        path: '/time/:id',
        name: 'time',
        component: Time
    },
]

export default routes;


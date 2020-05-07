import Faculty from '../pages/Faculty'
import Rehearsal from '../pages/Rehearsal'
import Time from '../pages/Time'
import Start from '../pages/Start'
import Pundit from '../pages/Pundit'
import Set from '../pages/Set'
import RehearsalFaculty from '../pages/RehearsalFaculty'
import RehearsalSet from '../pages/RehearsalSet'
import RehearsalPundit from '../pages/RehearsalPundit'
import Report from '../pages/Report'

const routes = [
    {
        path: '/',
        redirect: '/rehearsal'
    },
    {
        path: '/rehearsal',
        name: 'rehearsal',
        component: Rehearsal
    },
    {
        path: '/report/:re_id',
        name: 'report',
        component: Report
    },
    {
        path: '/rehearsalfaculty/:re_id',
        name: 'rehearsalfaculty',
        component: RehearsalFaculty
    },
    {
        path: '/rehearsalset/:re_id/:fac_id',
        name: 'rehearsalset',
        component: RehearsalSet
    },
    {
        path: '/rehearsalpundit/:re_id/:fac_id/:set_id',
        name: 'rehearsalpundit',
        component: RehearsalPundit
    },
    {
        path: '/set/:fac_id',
        name: 'set',
        component: Set
    },
    {
        path: '/pundit/:fac_id/:set_id',
        name: 'pundit',
        component: Pundit
    },
    {
        path: '/time/:re_id/:fac_id/:set_id',
        name: 'time',
        component: Time
    },
    {
        path: '/faculty',
        name: 'faculty',
        component: Faculty
    },

    {
        path: '/start',
        name: 'start',
        component: Start
    },
]

export default routes;


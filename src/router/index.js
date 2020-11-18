import Vue from 'vue'
import Router from 'vue-router'
import Contact from '../components/Contact.vue';
import ViwContact from '../components/ViwContact.vue';
Vue.use(Router)


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Contact
        },
        {
            path: '/contacts/:id',
            name: 'contacts',
            component: ViwContact,
            props: (route) => {
                const id = Number.parseInt(route.params.id, 10)
                if (Number.isNaN(id)) return 0
                return { id }
            }

        },

    ]
})
import Vue from 'vue'
import Router from 'vue-router'
import ListAllAdherents from '../components/ListAllAdherents'
import Calendar from '../components/Calendar';
import Photos from '../components/Photos';

Vue.use(Router)

const routes = [
    {
	path: '/users',
	name: 'Adherents',
	component: ListAllAdherents,
	props: true
    },
    {
	path: '/calendar',
	name: 'Calendar',
	component: Calendar
    },
    {
	path: '/photos',
	name: Photos,
	component: Photos
    }	
];

export default new Router({
    routes
})

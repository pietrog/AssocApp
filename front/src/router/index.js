import Vue from 'vue'
import Router from 'vue-router'
import ListAdherents from '../components/ListAdherents'
import Calendar from '../components/Calendar';
import Photos from '../components/Photos';

Vue.use(Router)

export default new Router({
    routes: [
	{
	    path: '/users',
	    name: 'Adherents',
	    component: ListAdherents
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
    ]
})

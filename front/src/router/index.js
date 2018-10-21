import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Adherents from '../components/Adherents'
import Calendar from '../components/Calendar';
import Photos from '../components/Photos';

Vue.use(Router)

export default new Router({
    routes: [
	{
	    path: '/users',
	    name: 'Adherents',
	    component: Adherents
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

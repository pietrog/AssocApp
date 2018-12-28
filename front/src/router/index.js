import Vue from 'vue'
import VueRouter from 'vue-router'
import ListAllAdherents from '../components/ListAllAdherents'
import Calendar from '../components/Calendar';
import Photos from '../components/Photos';
import Login from '../components/Login';
import Welcome from '../components/Welcome';
const AuthService = require( '../services/AuthenticationService').service;

const util = require('util');

Vue.use(VueRouter);

const routes = [
    {
	path: '/welcome',
	name: 'Welcome',
	component: Welcome
    },
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
	name: 'Photos',
	component: Photos
    },
    {
	path: '/login',
	name: 'Login',
	component: Login
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login')
	next();    
    else {
	if (AuthService.isAuthenticated()) {
	    console.log('token: ' + AuthService.getToken());
	    next();
	}
	else {
	    next('/login');
	}
    }

});

export default router;

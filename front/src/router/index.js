'use strict';

import Vue from 'vue'
import VueRouter from 'vue-router'
import ListAllAdherents from '../components/ListAllAdherents'

import store from '../store';

import Calendar from '../components/Calendar';
import Blog from '../components/Blog';
import Login from '../components/Login';
import Welcome from '../components/Welcome';
import Admin from '../components/Admin';
import AuthService from '../services/AuthenticationService';

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
	path: '/blog',
	name: 'Blog',
	component: Blog
    },
    {
	path: '/login',
	name: 'Login',
	component: Login
    },
    {
	path: '/admin',
	name: 'Admin',
	component: Admin
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login')
	next()
    else {
	if (store.state.isConnected) {
	    next();
	}
	else {
	    next('Login');
	}
    }

});

export default router;

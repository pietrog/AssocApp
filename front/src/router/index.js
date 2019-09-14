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

import ControlPanel from '@/components/ControlPanel'
import InfoPanel from '@/components/InfoPanel.vue';


const util = require('util');

Vue.use(VueRouter);

const routes = [
    {
	path: '/',
	name: "index",
	components: {default: Welcome, header: ControlPanel }
    },
    {
	path: '/welcome',
	name: 'Welcome',
	components: {default: Welcome, header: ControlPanel }
    },
    {
	path: '/users',
	name: 'Adherents',
	components: {default: ListAllAdherents, header: ControlPanel },
	props: true
    },
    {
	path: '/calendar',
	name: 'Calendar',
	components: {default: Calendar, header: ControlPanel }
    },
    {
	path: '/blog',
	name: 'Blog',
	components: {default: Blog, header: ControlPanel }
    },
    {
	path: '/login',
	name: 'Login',
	components: {default: Login, header: ControlPanel }
    },
    {
	path: '/admin',
	name: 'Admin',
	components: {default: Admin, header: ControlPanel }
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

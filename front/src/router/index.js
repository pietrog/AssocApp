import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Adherents from '../components/Adherents'

Vue.use(Router)

export default new Router({
    routes: [
	{
	    path: '/',
	    name: 'Adherents',
	    component: Adherents
	},
	{
	    path: '/hw',
	    name: 'HelloWorld',
	    component: HelloWorld
	}

	
    ]
})

import Vue from 'vue';
import Adherents from '../../../src/components/Adherents';

describe('Adherents.vue', () => {
    
    it('should render correct contents', () => {
	const Constructor = Vue.extend(Adherents);
	const vm = new Constructor().$mount();
	expect(vm.$el.querySelector('.adherents div').textContent)
	    .to.equal('Filters');
    });
    
})

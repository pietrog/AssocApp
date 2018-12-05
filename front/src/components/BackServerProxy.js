'use strict';

const axios = require('axios');


 class BackServerProxy {

    constructor(rootPath) {
	this.rootPath = rootPath;
    }

    async _get(path) {
	const res = await axios.get(this.rootPath + path);
	return res;
    }

    async _post(path, data) {
	const res = await axios.post(this.rootPath + path, data);
	return res;
    }

    async _delete(id) {
	await axios.delete(this.rootPath + id);
	return ;
    }

    async _update(data) {
	await axios.patch(this.rootPath + path, data);
	return;
    }

    
    

 };

export { BackServerProxy };

//module.export = DALService;


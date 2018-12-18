'use strict';

const axios = require('axios');


/*export default*/
class BackServerProxy {

    constructor(rootPath) {
	this.rootPath = rootPath;
    }

    async _get(path) {
	const res = await axios.get(this.rootPath + path);
	return res.data;
    }

    async _post(path, data) {
	const res = await axios.post(this.rootPath + path, data);
	return res.data;
    }

    async _delete(path, id) {
	await axios.delete(this.rootPath + path + id);
	return ;
    }

    async _update(path, data) {
	await axios.patch(this.rootPath + path, data);
	return;
    }

    
    

 };

module.exports = {
    proxy: BackServerProxy
};


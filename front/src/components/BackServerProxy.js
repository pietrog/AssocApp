'use strict';

const axios = require('axios');


/*export default*/
class BackServerProxy {

    constructor(rootPath) {
	this.rootPath = rootPath;
    }

    _get(path) {
	return axios.get(this.rootPath + path);
    }

    _post(path, data) {
	console.log('post : '+ this.rootPath + path);
	return axios.post(this.rootPath + path, data);
    }

    _delete(path, id) {
	return axios.delete(this.rootPath + path + id);
    }

    _update(path, data) {
	return axios.patch(this.rootPath + path, data);
    }

    
    

 };

module.exports = {
    proxy: BackServerProxy
};


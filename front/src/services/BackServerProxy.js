'use strict';

const axios = require('axios');

/*export default*/
class BackServerProxy {

    constructor(rootPath) {
	this.rootPath = rootPath;
    }

    _get(path, config) {
	return this._send_request('get', path, {}, config);
    }

    _post(path, data, config) {
	return this._send_request('post', path, data, config);
    }

    _delete(path, id, config) {
	return this._send_request('delete', path + id, {}, config);
    }

    _update(path, data, config) {
	return this._send_request('patch', path, data, config);
    }

    _upload_files(path, data, file_array, config) {
	let _config = config || {};

	//create form data to send to server
	let _data = new FormData();
	file_array.forEach((f) => {
	    _data.append("files", f, f.name);
	});
	//appends data
	_data.append("data", data);
	
	//set headers
	_config.headers = {
            'Content-Type': 'multipart/form-data'
	};
	return this._send_request('post', path, _data, _config);
    }

    _send_request(method, path, data, config) {
	const _config = this._addTokenToHeaders(config);
	
	const request = {
	    method: method,
	    url: this.rootPath + path,
	    data: data,
	    headers: _config.headers
	};
	return axios(request);
    }

    /**
     * Add token stored in local storage if found, null otherwise
     */
    _addTokenToHeaders(config) {
	//add token to headers
	const _config = config || {};
	const _headers = _config.headers || {};
	_headers['x-access-token'] = localStorage._token || null;
	_config.headers = _headers;
	return _config;
    }
    

 };

module.exports = {
    proxy: BackServerProxy
};


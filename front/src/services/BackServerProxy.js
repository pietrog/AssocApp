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

    _upload_files(path, file_array, config) {
	let _config = config || {};
	let data = new FormData();
	file_array.forEach((f) => {
	    data.append("files", f, f.name);
	});
	_config.headers = {
            'Content-Type': 'multipart/form-data'
	};
	return this._send_request('post', path, data, _config);
    }

    _send_request(method, path, data, config) {
	const _config = config || {};
	this._addTokenToHeaders(_config);
	
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


const GenTools = require('./general_tools');

class FinalReturnObject {
    
    constructor(result_status, warning_array, error_array) {

	/*if (Gentools.is_undefined(result_status))
	    throw new TypeError("Expects a result status (-1 if failed, 0 if succeed");
	}*/
	
	this.m_result_status = result_status;
	this.m_warning_array = warning_array;
	this.m_error_array = error_array;
    }

    get result_status() {
	return m_result_status;
    }

    get warning_array() {
	return m_warning_array;
    }

    get error_array() {
	return m_error_array;
    }
};


module.exports = FinalReturnObject;

const is_undef = function(variable){
    if (typeof variable === 'undefined')
    {
	return true;
    }

    return false;
}

/**
 * @brief Takes a date as a string, object(Date) or numeric and returns it as a numeric value from JS Date
 * @param {date} 
 * @returns number Date as a number of milliseconds 
 */
const checkDate = (date) => {
    if (typeof(date) === 'string') {
	return Date.parse(date);
    }
    if (typeof(date) === 'object') {
	return date.getTime();
    }
    return date;
};

/*
 * Merge two arrays in one, remove duplicates
 * @param {object} arrany_1 array to merge
 * @param {object} array_2 array to merge
 * @returns {object} Array resulting of merging the two inputed arrays, without duplicates
 */
const mergeTwoArrays = (_array_1, _array_2) => {

    let array_1 = _array_1 || [];
    let array_2 = _array_2 || [];
    
    //assert(Array.isArray(array_1), "Expects an array");
    //assert(Array.isArray(array_2), "Expects an array");

    if (array_1.length == 0) {
	return array_2;
    }
    if (array_2.length == 0) {
	return array_1;
    }
    
    //otherwise merge, sort, and remove duplicates
    let merged_array = array_1.concat(array_2);
    let result = [];
    merged_array.sort();
    
    let previous_value = merged_array[0];
    result.push(previous_value);
    let idx = 1;
    
    while (idx < merged_array.length) {
	if (!previous_value.equals(merged_array[idx])) {
	    result.push(merged_array[idx]);
	    previous_value = merged_array[idx];
	}
	++idx;
    }
    //console.log("result: " + util.inspect(result));	
    return result;	
}



module.exports = {
    is_undefined: is_undef,
    convertDateToNumber: checkDate,
    mergeArrays: mergeTwoArrays,    
}

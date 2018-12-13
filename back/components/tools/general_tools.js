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



module.exports = {
    is_undefined: is_undef,
    convertDateToNumber: checkDate
}

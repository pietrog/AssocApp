const is_undef = function(variable){
    if (typeof variable === 'undefined')
    {
	return true;
    }

    return false;
}


module.exports = {
    is_undefined: is_undef
}

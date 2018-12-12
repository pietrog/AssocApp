'use strict';

const toInputDate = (date) => {
    if (typeof(date) === 'string'){
	date = new Date(date);
    }
    const year = date.getFullYear();
    const month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
};

const fromJSDateToInputTime = (jsDate) => {
    const mins = jsDate.getMinutes();
    const hrs = jsDate.getHours();
    const minutes = mins < 10 ? '0'+mins : '' + mins;
    const hours = hrs < 10 ? '0'+hrs : '' + hrs;
    return hours +':' + minutes;
};


class CDate {

    constructor(date) {
	if (!date)
	    throw 'Expects a date, either a number, a string or an object';

	switch (typeof(date)) {
	    
	case 'number': 
	    this.input_date = toInputDate(new Date(date));
	    this.input_time = fromJSDateToInputTime(new Date(date));
	    this.date = new Date(date);
	    break;

	case 'object':
	    this.input_date = toInputDate(date);
	    this.input_time = fromJSDateToInputTime(date);
	    this.date = date;
	    break;

	case 'string':
	    this.date = new Date(date);
	    this.input_date = toInputDate(this.date);
	    this.input_time = fromJSDateToInputTime(new Date(date));
	    break;
	}
    }

    getInputStringDate() {
	return this.input_date;
    }

    getInputStringTime() {
	return this.input_time;
    }

    getJSDate() {
	return this.date;
    }

    getNumericDate() {
	return this.date.getTime();
    }
};


module.exports = CDate;

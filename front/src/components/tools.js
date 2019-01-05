/**
 * Transforms a javascript date to an html input date
 * @param {date} object Javascript date object
 * @returns string A date string for html input date: "YYYY-MM-DD" 
 */
const toInputDate = (date) => {
    if (typeof(date) === 'string' || typeof(date) == 'number'){
	date = new Date(date);
    }

    const year = date.getFullYear();
    const month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
};
module.exports.toInputDate = toInputDate;

/**
 * Takes a HTML input date and HTML input time and returns a Javascript date object
 * @param {date} An html input date: "YYYY-MM-DD" 
 * @param {time} An HTML input time: "HH:MM:SS"
 * @returns object A Javascript date builds from given html date and time
 */
const toJSDate = (date, time_) => {
    let time = time_ || "00:00";
    let dateArray = date.split("-");
    let timeArray = time.split(":");
    let resdate = new Date(dateArray[0], dateArray[1]-1, dateArray[2], timeArray[0], timeArray[1]);
    return resdate;
};
module.exports.toJSDate = toJSDate;

const toReadableDate = (date) => {
    const jsDate = new Date(date);
    const day = jsDate.getDate() < 10 ? "0" + jsDate.getDate() : jsDate.getDate();
    let month = jsDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    return day + " / " + month + " / " + jsDate.getFullYear();
}
module.exports.toReadableDate = toReadableDate;

/**
 * Takes a javascript date and transforms it to a HTML input time 
 * @param {jsDate} object A javascript date object
 * @returns string A HTML input time:'HH:MM'
 */ 
const fromJSDateToInputTime = (jsDate) => {
    const mins = jsDate.getMinutes();
    const hrs = jsDate.getHours();
    const minutes = mins < 10 ? '0'+mins : '' + mins;
    const hours = hrs < 10 ? '0'+hrs : '' + hrs;
    return hours +':' + minutes;
};
module.exports.fromJSDateToInputTime = fromJSDateToInputTime;



/**
 * Compares 2 input of same types
 * @param d1
 * @param d2
 * @returns number If d1 strictly less than d2 returns -1, strictly greater than d2 returns 1, otherwise equals returns 0
 */
const compareDates = (d1, d2) => {
    if (d1 < d2) return -1;
    if (d1 == d2) return 0;
    if (d1 > d2) return 1;
};
module.exports.compareDates = compareDates;


/**
 * Compares 2 dates
 * @param {d1} object 
 * @param {d2} object 
 * @returns number -1 if d1 < d2, 0 if d1 === d2, 1 if d1 > d2
 */
const compareInputDates = (d1, d2) => {
    compareDates(toJSDate(d1), toJSDate(d2));
};
module.exports.compareInputDates = compareInputDates;

/**
 * Returns true if duration between d1 and d2 is at least 15 minutes
 */
const validateStartEndDates = (d1, d2) => {
    //minimum: d1 + 15 min = d2
    const dl1 = d1.getTime();
    const dl2 = d2.getTime();

    //espace minimum
    const minEpsilon = 15 * 60 * 1000;

    if (dl1 + minEpsilon < dl2)
	return true;
    return false;
};
module.exports.validateStartEndDates = validateStartEndDates;

/**
 * Move an element from one a1 to a2 if one element passes the test
 */
const moveEltWithinArrays = (a1, a2, matchingValue) => {
    let found = null;
    a1.find((elt, index, array) => {
	if (elt._id === matchingValue) {
	    found = elt;
	    array.splice(index, 1);
	    return true;
	}
	return false;
    });
    if (found) {
	a2.push(found);
    }
}
module.exports.moveEltWithinArrays = moveEltWithinArrays;


/**
 * Extract status and data from http response from the back and build the InfoMessage corresponding
 */
const sendMessage = (store, response) => {
    //response should always contain status part and message part
    const message = {
	status: response.data.status,
	content: response.data.message
    };
    store.commit('pushMessage', message);
    
};
module.exports.sendMessage = sendMessage;

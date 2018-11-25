const toInputDate = (date) => {
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
};
module.exports.toInputDate = toInputDate;

const toJSDate = (date, time) => {
    let dateArray = date.split("-");
    let timeArray = time.split(":");
    let resdate = new Date(dateArray[0], dateArray[1]-1, dateArray[2], timeArray[0], timeArray[1]);
    return resdate;
};
module.exports.toJSDate = toJSDate;


const fromJSDateToInputTime = (jsDate) => {
    const mins = jsDate.getMinutes();
    const hrs = jsDate.getHours();
    const minutes = mins < 10 ? '0'+mins : '' + mins;
    const hours = hrs < 10 ? '0'+hrs : '' + hrs;
    return hours +':' + minutes;
};
module.exports.fromJSDateToInputTime = fromJSDateToInputTime;



const compareDates = (d1, d2) => {
    if (d1 < d2) return -1;
    if (d1 == d2) return 0;
    if (d1 > d2) return 1;
};
module.exports.compareDates = compareDates;


const compareInputDates = (d1, d2) => {
    compareDates(toJSDate(d1), toJSDate(d2));
};
module.exports.compareInputDates = compareInputDates;

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

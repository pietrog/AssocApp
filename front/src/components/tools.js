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

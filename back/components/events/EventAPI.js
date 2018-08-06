const EventDAL = require('./EventDAL').EventDAL;

const findEventByCritera = (event_description) => {
    return EventDAL.lookForExistingEvent(event_description);
};
module.exports.findEventByCritera = findEventByCritera;

const addEvent = (name, brief, description, begin_date, end_date) => {
    return EventDAL.addEvent(name, brief, description, begin_date, end_date);
};
module.exports.addEvent = addEvent;

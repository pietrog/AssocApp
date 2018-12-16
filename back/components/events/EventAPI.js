const EventDAL = require('./EventDAL').EventDAL;

const findEventByCritera = (event_description) => {
    return EventDAL.lookForExistingEvent(event_description);
};
module.exports.findEventByCritera = findEventByCritera;

const findEventByID = (id) => {
    return EventDAL.lookForExistingEventByID(id);
};
module.exports.findEventByID = findEventByID;

const addEvent = (name, brief, description, begin_date, end_date, style) => {
    return EventDAL.addEvent(name, brief, description, begin_date, end_date, style);
};
module.exports.addEvent = addEvent;

const deleteEvent = (idEvent) => {
    return EventDAL.deleteEventByID(idEvent);
};
module.exports.deleteEvent = deleteEvent;

const updateRootObjectID = (name, root_id) => {
    return EventDAL.updateRootObjectID(name, root_id);
};
module.exports.updateRootObjectID = updateRootObjectID;

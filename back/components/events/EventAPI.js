const EventDAL = require('./EventDAL').EventDAL;

const findEventByCritera = (event_description) => {
    return EventDAL.lookForExistingEvent(event_description);
};
module.exports.findEventByCritera = findEventByCritera;

const findEventByID = (id) => {
    return EventDAL.lookForExistingEventByID(id);
};
module.exports.findEventByID = findEventByID;

const addEvent = (name, description, begin_date, end_date, style) => {
    return EventDAL.addEvent(name, description, begin_date, end_date, style);
};
module.exports.addEvent = addEvent;

const addEventWithDuration = (name, description, begin_date, duration, style) => {
    const beg_date = new Date(begin_date);
    const end_date = beg_date.getTime() + duration * 60000;
    console.log('begin: '+ begin_date)
    console.log('end: '+ end_date)
    //console.log('duration: '+ duration)
    return EventDAL.addEvent(name, description, begin_date, end_date, style);
};
module.exports.addEventWithDuration = addEventWithDuration;


const deleteEvent = (idEvent) => {
    return EventDAL.deleteEventByID(idEvent);
};
module.exports.deleteEvent = deleteEvent;

const deleteEventsByName = (name) => {
    return EventDAL.deleteEventsByName(name);
};
module.exports.deleteEventsByName = deleteEventsByName;

const updateName = (name, new_name) => {
    return EventDAL.updateName(name, new_name);
};
module.exports.updateName = updateName;

const updateUsers = (name, user_list) => {
    return EventDAL.updateUsers(name, user_list);
};
module.exports.updateUsers = updateUsers;

const countEventsByName = (name) => {
    return EventDAL.countEventsByName(name);
}
module.exports.countEventsByName = countEventsByName;

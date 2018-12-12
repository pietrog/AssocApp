const checkDate = (date) => {
    if (typeof(date) === 'string') {
	return Date.parse(date);
    }
    if (typeof(date) === 'object') {
	return date.getTime();
    }
    return date;
};

const UserDAL = require('./UserMongoDAL').UserDAL,
      GenTools = require('../tools'),
      error_messages = require('./error_messages');
      

const addStudent = (user) => {
    user.birthdate = checkDate(user.birthdate);
    return UserDAL.addStudent(user);
};
module.exports.addStudent = addStudent;

const addStaff = (user) => {
    user.birthdate = checkDate(user.birthdate);
    return UserDAL.addStaff(user);
};
module.exports.addStaff = addStaff;

const addTeacher = (user) => {
    user.birthdate = checkDate(user.birthdate);
    return UserDAL.addTeacher(user);
};
module.exports.addTeacher = addTeacher;

const addManager = (user) => {
    user.birthdate = checkDate(user.birthdate);
    return UserDAL.addManager(user);
};
module.exports.addManager = addManager;

const findUserById =  (userId) => {
    return UserDAL.findUserById(userId);
};
module.exports.findUserById = findUserById;

const findUsersByCritera =  (firstname, lastname, role, mail, phone) => {    
    return UserDAL.findUsersByCritera(firstname, lastname, role, mail, phone);
};
module.exports.findUsersByCritera = findUsersByCritera;

const getAllUsers = () => {
    return findUsersByCritera();
};
module.exports.getAllUsers = getAllUsers;

module.exports.getAllStudents = () => {
    return findUsersByCritera(null, null, "student");
};
module.exports.getAllTeachers = () => {
    return findUsersByCritera(null, null, "teacher");
};
module.exports.getAllManagers = () => {
    return findUsersByCritera(null, null, "manager");
};
module.exports.getAllStaffs = () => {
    return findUsersByCritera(null, null, "staff");
};

module.exports.removeUser = async (userID) => {
    return UserDAL.removeUser(userID);
};

/*
 * Count functions
 * @returns {int} Number of rows depending on the user status
 */
const countStudents =  (role) => {
    return UserDAL.countStudents();
};
const countStaffs =  (role) => {
    return UserDAL.countStaffs();
};
const countTeachers =  (role) => {
    return UserDAL.countTeachers();
};
const countManagers =  (role) => {
    return UserDAL.countManagers();
};
module.exports.countStudents = countStudents;
module.exports.countStaffs = countStaffs;
module.exports.countTeachers = countTeachers;
module.exports.countManagers = countManagers;

const updateUserByID = (userID, userDef) => {
    return UserDAL.modifyUser(userID, userDef);
};
module.exports.updateUserByID = updateUserByID;

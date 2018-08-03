
const UserDAL = require('./UserMongoDAL').UserDAL,
      GenTools = require('../tools'),
      error_messages = require('./error_messages');
      

const addStudent = (user) => {
    return UserDAL.addStudent(user);
};
module.exports.addStudent = addStudent;

const addStaff = (user) => {
    return UserDAL.addStaff(user);
};
module.exports.addStaff = addStaff;

const addTeacher = (user) => {
    return UserDAL.addTeacher(user);
};
module.exports.addTeacher = addTeacher;

const addManager = (user) => {
    return UserDAL.addManager(user);
};
module.exports.addManager = addManager;

const findUserById =  (userId) => {
    return UserDAL.findUserById(userId);
};
module.exports.findUserById = findUserById;

const findUserByCritera =  (firstname, lastname, role, mail, phone) => {    
    return UserDAL.findUserById(firstname, lastname, role, mail, phone);
};
module.exports.findUserById = findUserById;


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
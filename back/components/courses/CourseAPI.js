const CourseDAL = require('./CourseDAL').CourseDAL;
const { convertDateToNumber } = require('../tools');

/*
 * Create a recurrent course, given a frequency
 *
 * @param {string} name
 * @param {string} description
 * @param {number} first_start_date
 * @param {number} duration duration of the course in minutes
 * @param {number} final_course_date
 * @param {string} cron_frequency right now, only take account days of week (ex, for every monday expects * * * * 1)
 * @param {number} [intensity]
 *
 * @throws {}
 * @returns {object} Inserted object Course 
 */
const createCourse =
      (name, description, first_start_date, duration, final_course_date, cron_frequency, intensity) => {
	  first_start_date = convertDateToNumber(first_start_date);
	  final_course_date = convertDateToNumber(final_course_date);
	  return CourseDAL.createRecurrentCourse(name, description,
						 first_start_date, duration,
						 final_course_date, cron_frequency, intensity);
};
module.exports.createCourse = createCourse;

const getCourseByName = (name) => {
    return CourseDAL.getCourseByName(name);
};
module.exports.getCourseByName = getCourseByName;


const getCourse = (id) => {
    return CourseDAL.getCourse(id);
};
module.exports.getCourse = getCourse;

const addUsersToCourse = (course_id, user_list) => {
    return CourseDAL.addUsersToCourse(course_id, user_list);
};
module.exports.addUsersToCourse = addUsersToCourse;

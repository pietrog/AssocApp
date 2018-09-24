const CourseDAL = require('./CourseDAL').CourseDAL;

const createCourse = (name, description, first_start_date, duration, final_course_date, cron_frequency, intensity) => {
    return CourseDAL.createRecurrentCourse(name, description, first_start_date, duration, final_course_date, cron_frequency, intensity);
};
module.exports.createCourse = createCourse;


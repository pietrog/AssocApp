const EventListDAL = require('./EventListDAL').EventListDAL;

const createRecurrentEvent =
      async (name, brief, description, first_start_date, duration, frequency, final_event_date, style) => {
	  const result =
		await EventListDAL.createRecurrentEvent(name, brief, description,
							first_start_date, duration, frequency,
							final_event_date, style);
	  return result;
      };
module.exports.createRecurrentEvent = createRecurrentEvent;


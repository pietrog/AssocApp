const EntryDAL = require('./EntryDAL').EntryDAL;

const createNewEntry = (title, publicationDate, expiryDate, message, priority, pictureArray, otherDocArray) => {
    return EntryDAL.createNewEntry(title, publicationDate, expiryDate,
				   message, priority, pictureArray, otherDocArray);
};
module.exports.createNewEntry = createNewEntry;


const getOneEntry = (title) => {
    return EntryDAL.getEntryByName(title);
}
module.exports.getOneEntry = getOneEntry;


const getEntries = (startPubDate, startCreationDate) => {
    return EntryDAL.getAllEntry(startPubDate, startCreationDate);
}
module.exports.getEntries = getEntries;

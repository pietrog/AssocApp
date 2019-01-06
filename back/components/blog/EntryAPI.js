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


const getEntries = (minPublicationDate, minCreationDate, maxExpiryDate) => {
    return EntryDAL.getAllEntry(minPublicationDate, minCreationDate, maxExpiryDate);
}
module.exports.getEntries = getEntries;

const removeEntryByID = (id) => {
    return EntryDAL.removeOneEntry(id);
};
module.exports.removeEntryByID = removeEntryByID;

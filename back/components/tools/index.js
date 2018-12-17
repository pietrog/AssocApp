const general_tools = require('./general_tools'),
      FinalReturnObject = require('./FinalReturnObject');

module.exports = {
    is_undef: general_tools.is_undefined,
    convertDateToNumber: general_tools.convertDateToNumber,
    FinalReturnObject: FinalReturnObject,
    mergeArrays: general_tools.mergeArrays,
}

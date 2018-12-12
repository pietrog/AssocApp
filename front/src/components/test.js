const util = require('util');
const CDate = require('./Date');

const jsd = new Date(Date.now());

let d = new CDate(jsd);
let d2 = new CDate(jsd.getTime());

console.log('coucou: ' + util.inspect(d));
console.log('coucou: ' + util.inspect(d2));
console.log('coucou: ' + jsd.toUTCString());


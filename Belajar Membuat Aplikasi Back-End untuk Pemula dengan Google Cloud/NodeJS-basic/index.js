const message = (name) => {
    console.log(`Hello ${name}`);
 }
  
 message('JavaScript');

 const moment = require('moment');
 
const date = moment().format("MMM Do YYYY");
console.log(date);
const fs = require('fs');
const { resolve } = require('path');


const data = fs.readFileSync(resolve(__dirname, 'notes.txt'), 'UTF-8');
console.log(data);
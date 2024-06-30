/**
 * TODO:
 * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
 * menggunakan teknik readable stream dan writable stream.
 */
const fs = require('fs');
const { resolve } = require('path');


const input = fs.createReadStream(resolve(__dirname, 'input.txt'), {
    highWaterMark: 15,
});

const writableStream = fs.createWriteStream(resolve(__dirname, 'output.txt'));
input.on('readable', () => {
    try {
      writableStream.write(`${input.read()}\n`);
    } catch (error) {
      // catch the error when the chunk cannot be read.
    }
  });
  
  input.on('end', () => {
    writableStream.end();
  });
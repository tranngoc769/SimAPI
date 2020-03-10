'use strict';

const fs = require('fs');

module.exports = function (filename, lineEnding = '\n') {
  return new Promise(function (resolve, reject) {
    if (!filename) {
      reject(new Error('Filename missing'));
    }
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }

      if (!data) {
        resolve('');
      } else {
        var firstLine = [];
        var linesExceptFirst = [];

        firstLine = data.split(lineEnding)[0];

        linesExceptFirst = data
          .split(lineEnding)
          .slice(1)
          .join(lineEnding);

        fs.writeFile(filename, linesExceptFirst, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(firstLine);
          }
        });

      }

    });
  });
};

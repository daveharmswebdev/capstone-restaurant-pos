'use strict';

let mock = {};

function getHours() {
  let hours = [11,11,11,12,12,12,12,13,14,15,16,16,17,17,17,18,18,18,18,19,19,19,20,20,20,21,21];
  let n = Math.floor(Math.random() * 27);
  return hours[n];
}

mock.getData = function(mockDate) {
  let tempDate = new Date(mockDate);
  console.log('start', tempDate);
  for (let x = 0; x < 5; x++) {
    tempDate.setDate(tempDate.getDate() + 1);
    let customers = Math.floor(Math.random() * 10) + 25;
    for (let i = 0; i < customers; i++) {
      tempDate.setHours(getHours(), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
      console.log(x, tempDate, customers);
    }
  }
};

module.exports = mock;

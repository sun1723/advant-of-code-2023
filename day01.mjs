import fs from "fs";
var array = fs.readFileSync("./input/input01.txt").toString().split("\n");

const numberMapping = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine",
};

const sum = array.reduce((acc, line) => {
  // replace words with number
  for (let num of Object.keys(numberMapping)) {
    line = line.replaceAll(num, numberMapping[num]);
  }
  let firstDigit = line.match(/[0-9]/g)[0];
  let lastDigit = line.match(/[0-9]/g).slice(-1)[0];
  console.log(firstDigit, lastDigit);
  acc += parseInt(firstDigit) * 10 + parseInt(lastDigit);
  return acc;
}, 0);
console.log(sum);

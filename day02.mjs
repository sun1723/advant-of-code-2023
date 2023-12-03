import fs from "fs";
var array = fs.readFileSync("./input/input02.txt").toString().split("\n");

const regex = /Game\s*(\d+):/gi;
const sum = array.reduce((acc, cur) => {
  let mapping = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const id = parseInt(cur.split(":")[0].split(" ")[1]);
  const secondPart = cur.split(":")[1];
  const sets = secondPart.split(";");
  for (const set of sets) {
    const items = set.split(",");
    for (const item of items) {
      const number = item.split(" ")[1];
      const color = item.split(" ")[2];
      if (parseInt(number) > mapping[color]) {
        // update quantity per color
        mapping[color] = parseInt(number);
      }
    }
  }
  acc += Object.values(mapping).reduce((acc, cur) => acc * cur, 1);
  return acc;
}, 0);
console.log(sum);

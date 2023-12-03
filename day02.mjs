import fs from "fs";
var array = fs.readFileSync("./input/input02.txt").toString().split("\n");

const mapping = {
  red: 12,
  green: 13,
  blue: 14,
};

const regex = /Game\s*(\d+):/gi;
const sum = array.reduce((acc, cur) => {
  let flag = true;
  const id = parseInt(cur.split(":")[0].split(" ")[1]);
  const secondPart = cur.split(":")[1];
  const sets = secondPart.split(";");
  for (const set of sets) {
    const items = set.split(",");
    for (const item of items) {
      const number = item.split(" ")[1];
      const color = item.split(" ")[2];
      if (parseInt(number) > mapping[color]) {
        flag = false;
        continue;
      }
    }
  }
  if (flag) {
    acc += id;
  }
  return acc;
}, 0);
console.log(sum);

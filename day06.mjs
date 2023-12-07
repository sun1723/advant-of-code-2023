import fs from "fs";
var array = fs.readFileSync("./input/input06.txt").toString().split("\n");
// construct map
const map =[]
const times = [parseInt(array[0].match(/(\d+)/g).reduce((acc,cur)=>{return acc += cur},''))]
const records = [parseInt(array[1].match(/(\d+)/g).reduce((acc,cur)=>{return acc += cur},''))];
let count = -1;
let res = 1;

for(let i=0; i<times.length; i++) {
    count = 0;
    for(let j=0; j<= times[i];j++) {
        const rest = times[i] - j;
        if(rest * j > records[i]) {
            count ++;
        }
    }
    map.push(count);
    res*=count;
}

console.log(res)
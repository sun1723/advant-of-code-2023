import fs from "fs";
var array = fs.readFileSync("./input/input08.txt").toString().split("\n");

const operationMapping = {
    'L': 'left',
    'R': 'right'
}
const map = {};
let instruction = [];
for (let i = 0; i<array.length; i++) {
    // store instructions
    if(i === 0) {
        instruction = [...array[0].split('')];
    }
    else if(array[i] === ''){
        continue;
    }else {
        // generate mappings
        // TODO: this is a redundant step mate, you could just make it as part of the regex... :)
        const key = array[i].split(' = ')[0];

        const regex = /\(([A-Z]+),\s*([A-Z]+)\)/;
        const [,left,right] = array[i].split(' = ')[1].match(regex);
        map[key]={left,right}
    }
}
// console.log(map)
// folow instruction
let operation = 0;
let res = 0;
let currentPoint = Object.keys(map).find(it=>it==='AAA');
while(currentPoint !== 'ZZZ') {
    // reseting the pointer when operation is out of range
    if(operation === instruction.length) {
        operation = 0;
    }
    // find the next point according to operation
    currentPoint = map[currentPoint][operationMapping[instruction[operation]]]
    operation ++;
    res ++;
    // console.log(currentPoint)
}
console.log(res)
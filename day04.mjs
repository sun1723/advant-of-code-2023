import fs from "fs";
var array = fs.readFileSync("./input/input04.txt").toString().split("\n");

let cardMap={}
let sum = 0;
for(const line of array) {
    let count =0 ;
    const cardNumber = line.split(':')[0].match(/(\d+)/g)[0];
    const winingList = line.split(':')[1].split('|')[0].match(/(\d+)/g).map(Number);
    const myList = line.split(':')[1].split('|')[1].match(/(\d+)/g).map(Number);

    for (const num of myList) {
        const isIncluded = winingList.includes(num);
        if(isIncluded) {
            count ++;
        }
    }
    if(count > 0) {
        cardMap[cardNumber] = Math.pow(2,count-1)
        sum += cardMap[cardNumber];
    }else {
        cardMap[cardNumber]=0;
    }
}
console.log(sum)
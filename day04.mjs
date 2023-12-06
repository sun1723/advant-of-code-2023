import fs from "fs";
var array = fs.readFileSync("./input/input04.txt").toString().split("\n");

let cardMap={};
let cards={}
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
    cardMap[cardNumber] = count;
    for(let j=1;j<=count; j++ ) {
        if(!cards[parseInt(cardNumber) + j]){
            cards[parseInt(cardNumber) + j] =0;
        }
        cards[parseInt(cardNumber) + j] += 1;
    };
    if(cards[cardNumber]) {
        for(let k=0; k<cards[cardNumber]; k++) {
            for(let l=1;l<=count;l++ ) {
                cards[parseInt(cardNumber) + l] += 1;
            };
        }
    }
}
for(const it of Object.values(cards)){
    sum += it;
}

console.log(sum += array.length)
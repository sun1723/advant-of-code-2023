import fs from "fs";
var array = fs.readFileSync("./input/input03.txt").toString().split("\n");

/**
 * check if symbols near by a number
 * 1. find number -- regex
 * 2. check the surrounding index for a symbol, EG, symbol is at (x,y), its possibile number spot would be (x-1,y),(x+1,y),(x-1,y+1),(x,y+1),(x+1,y+1),(x-1,y-1),(x,y-1),(x+1,y)
 * 3. loop through each possible spot, if the symbol lay between the startIndex and endIndex of extracted number, we can tell the symbol is surrounding the number, then update sum 
 */


function extractNumbersAndSymbols(inputString) {
    const regex = /(\d+(\^.\d*)?)|[^.\d]/g;
    let match;
    const result = [];
  
    while ((match = regex.exec(inputString)) !== null) {
      const value = match[0];
      const startIndex = match.index;
      const endIndex = match.index + value.length - 1;
  
      if (value !== '.') {
        result.push({
          value,
          startIndex,
          endIndex,
        });
      }
    }
  
    return result;
  }

const symbolsMap =[];
for(let i =0; i<array.length; i++) {
    const symbols = extractNumbersAndSymbols(array[i]);
    
    symbolsMap.push(symbols.reduce((acc,symbol) => {
        // check if it is a symbol
        if(isNaN(symbol.value)) {
            acc.push(symbol.startIndex);
        }
        return acc;
    },[]));
}

const numberMap={};
for(let i =0; i<symbolsMap.length; i++) {
    if(symbolsMap[i].length === 0) {
        continue;
    }
    if(!numberMap[i-1]) {
        numberMap[i-1]=[];
    }
    // y-1 row,TODO: check if it is row 0
    numberMap[i-1]=[...new Set([...numberMap[i-1],...symbolsMap[i].reduce((acc, symbolIndex)=>{
        acc.push(symbolIndex-1);
        acc.push(symbolIndex);
        acc.push(symbolIndex+1);
        return acc;
    },[])])]

    if(!numberMap[i]) {
        numberMap[i]=[];
    }
    // y row
    numberMap[i]=[...new Set([...numberMap[i] ,...symbolsMap[i].reduce((acc, symbolIndex)=>{
        acc.push(symbolIndex-1);
        acc.push(symbolIndex+1);
        return acc;
    },[])])]
    if(!numberMap[i+1]) {
        numberMap[i+1]=[];
    }
    //y+1 row,TODO: check if it is the last line
    numberMap[i+1]=[...new Set([...numberMap[i+1],...symbolsMap[i].reduce((acc, symbolIndex)=>{
        acc.push(symbolIndex-1);
        acc.push(symbolIndex);
        acc.push(symbolIndex+1);
        return acc;
    },[])])]
}

let sum = 0;
const res = [];
// check numbers from original extraction
for(let i =0; i<array.length; i++) {
    const elements = extractNumbersAndSymbols(array[i]);
    elements.map(element =>  {
        const number =parseInt(element.value);
        // check if it is a number
        if(!isNaN(number)) {
            for(const num of numberMap[i]){
                if(num>=element.startIndex && num <= element.endIndex) {
                    res.push(number);
                    sum += number;
                    break;
                }
            }
        }
    })
}

console.log(sum)
import fs from "fs";
var array = fs.readFileSync("./input/input05.txt").toString().split("\n");

const map= {}
let seeds=[];
let typeName = '';
for (const line of array) {
    const isSeeds = line.includes('seeds');
    const isType = line.includes('map');
    // if it is an empty line, line[0] would be undefined
    const isEmptyLine = !line[0];
    if(isSeeds) {
       seeds = line.match(/(\d+)/g);
    }
    else if (isType) {
        typeName = line.split(' ')[0];
        map[typeName]=[];
    }else if (!isEmptyLine) {
        const temp=  line.match(/(\d+)/g).map(Number);
        // build the data for a specific type in map
        if(map[typeName]) {
            map[typeName].push(temp)
        }
    }else {
        // reset
        typeName=''
        continue;
    }

}

console.log(map)
const res=[]
let nextSearch=-1

// part 2: the process to check a specific seed:
//      1): check if start seed is in range start=> start + num
//      2); check how many seeds will be supported in range (seed, seed + num)
//      3): ???
for (const seed of seeds) {
    nextSearch=parseInt(seed);
    const location = Object.values(map).reduce ((acc, cur)=>{
        // console.log(cur)
        // iterate through different array
        for(const arr of cur) {
            const [dest,start,num] = arr;
            // check if current seed is in range
            if((parseInt(acc) >= start) && (parseInt(acc) < start + num)) {
                // update nextsearch
                acc = parseInt(acc)-start + dest;
                break;
            }
        }
        console.log(acc)
        return acc;
        
    },nextSearch)
    res.push(location)
}
console.log(Math.min(...res))
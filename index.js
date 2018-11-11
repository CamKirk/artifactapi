const cardset = require('./cardSet');
const encoder = require('./deckFunctions.js');
const fs = require('fs');

// cardset(0).then((res)=>{
//     console.log(res);
//     fs.writeFile("./cardjson",JSON.stringify(res,null,2));
// });

let deck = 
    {
        heroes: [
            [4000, 1], 
            [4003, 1],
        ],

        cards: [
            [4004, 3]
        ],
        name:"ZoosCluze"
    }
;
// console.log(encoder.encodeBytesToString(0010101));

console.log(encoder.encodeDeck(deck));

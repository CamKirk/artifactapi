const cardset = require('./cardSet');
const encoder = require('./deckFunctionsClass.js');
const fs = require('fs');

// cardset(0).then((res)=>{
//     console.log(res);
//     fs.writeFile("./cardjson",JSON.stringify(res,null,2));
// });

let deck = 
{ heroes: [],
    cards:
     [ { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 },
       { id: 4005, count: 3 } ],
    name: 'Green/Black Example' }
// console.log(encoder.encodeBytesToString(0010101));
console.log('ADCJWkTZX05uwGDCRV4XQGy3QGLmqUBg4GQJgGLGgO7AaABR3JlZW4vQmxhY2sgRXhhbXBsZQ__');

console.log(encoder.encodeDeck(deck));

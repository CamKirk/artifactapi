const cardset = require('./cardSet');

// cardset(0).then((res)=>{
//     console.log(res);
    
// });

 let dict = {
     heroes:[
         {
             id: 3
         },
         {
             id: 8
         },
         {
             id: 1
         }
     ],
     bury:function(){
         innerray = [1,2,3]
         innerray.forEach(()=>{
             console.log(Object.keys(this));
             
         })
     }
    
 };
dict.bury();
//  function sortByCardId(a,b){
//      return a.id - b.id;
//  }

//  dict.heroes.sort(sortByCardId);
//  console.log(dict);
 
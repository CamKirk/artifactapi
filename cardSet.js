const axios = require('axios');

function getCardSet(setNumber){
    return axios.get(`https://playartifact.com/cardset/${setNumber}`).then((results)=>{
        const {cdn_root, url} = results.data;
        return axios.get(cdn_root + url);
    }).then((resultObj)=>{
        return resultObj.data;     
    }).catch((err)=>{
        return Error("Error occurred in Axios request to Valve database");
    });
}

module.exports = getCardSet;
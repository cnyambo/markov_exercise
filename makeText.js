const fs =require('fs');
const axios = require('axios');
const { MarkovMachine, constructor, makeChains, makeText } = require("./markov");

const URL = require('url').URL;
function validateUrl(urlString) {
    try {
        new URL(urlString);
        return true;
      } catch {
        return false;
      }
}
 
const readDataFromFile = (path) =>{ 
    fs.readFile(`${path}`, 'utf8', function(err, data) {
        if(err) {
            console.log(err);
            process.kill(1);
        } else {
            console.log(data);
            let result = new MarkovMachine(data);
            result.makeText();
            console.log(`... generated text from file ${path} ...`)
        }
    });
}


const readDataFromUrl = (url) => { 
    axios.get(url).then(function(resp) {
        let result = new MarkovMachine(resp.data);
        result.makeText(100);
        console.log(`... generated text from file ${url} ...`)
    }).catch(err => console.log(`Error fetching ${url}, ${err}`))
}

for(let i =0; i < process.argv.length; i++) {
    console.log(process.argv[i])
    if (process.argv[2] == 'file') {

        if(validateUrl(process.argv[3])) {
            break;
        }
        else {
            readDataFromFile(process.argv[3]);
        }
    }
    else if (process.argv[2] == 'url'){
        if(!validateUrl(process.argv[3])) {
            break;
        }
        else {
            readDataFromUrl(process.argv[3]);
        }  
    }
    else {
        console.log('Not valid inputs'); 
        break;
    }
}

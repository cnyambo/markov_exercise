/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let dic = {};
    let occurrence = this.words.reduce(function (acc, curr) { return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc  }, {});
    for(let i =0; i<this.words.length; i++) {
        if (occurrence[this.words[i]] == 1)
        {
            if( i != this.words.length -1) { dic[this.words[i]]=[this.words[i+1]]}
            else{dic[this.words[i]]=[null]}
        }
        else if (occurrence[this.words[i]] > 1   )
        {
            if(i != this.words.length -1){
                if (!dic[this.words[i]]) {
                    dic[this.words[i]] = [this.words[i+1]];
                }
                else{dic[this.words[i]].push(this.words[i+1]) }  
            }else{ dic[this.words[i]].push(null)  }            
        }
    } 
      //console.log(dic)
      return dic;
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let chainText = this.makeChains();
    let chainLength = Object.keys(chainText).length;
    let randomText = '';
    console.log(chainText)
    let chainKeys = [];
    for(let i in chainText) {
      chainKeys.push(i);
    }

    if(numWords){
      for(let i = 0; i< numWords; i++)  {
        let randVal = Math.floor(Math.random() * chainLength);
        if(randomText.length < numWords) {
          let chaineValues = chainText[chainKeys[randVal]] ;
          let randNewVal= Math.floor(Math.random() * chaineValues.length);
          if(chaineValues.length == 1 &&  chaineValues[0] == null) {
            randomText = randomText + ' ' + chainKeys[randVal]
          }
          else {
             randomText = randomText + ' ' + chainKeys[randVal] + ' ' + chaineValues[randNewVal];
          }
         
        }
        else{break}
      }
    }
    else {
      let randVal = Math.floor(Math.random() * chainLength);
      let chaineValues = chainText[chainKeys[randVal]];
      let randNewVal= Math.floor(Math.random() * chaineValues.length);
      if(chaineValues.length == 1 &&  chaineValues[0] == null) {
        randomText = randomText + ' ' + chainKeys[randVal]
      }
      else {
         randomText = randomText + ' ' + chainKeys[randVal] + ' ' + chaineValues[randNewVal];
      }
    }
    console.log(randomText);
    return randomText;
  }
  
}

let mm = new MarkovMachine("the cat in the hat");
mm.makeText();
//mm.makeText(numWords=50);
//mm.makeText(numWords=10);
//mm.makeChains;

module.exports = { 
  MarkovMachine : MarkovMachine,
  constructor : this.constructor,
  makeChains : this.makeChains,
  //makeText : this.makeText
};
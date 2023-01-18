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

    let words = this;
    //console.log(words)
    let dic = {};
    let occurrence = words.reduce(function (acc, curr) { return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc  }, {});
 
    for(let i =0; i<words.length; i++) {
        if (occurrence[words[i]] == 1)
        {
            if( i != words.length -1) { dic[words[i]]=[words[i+1]]}
            else{dic[words[i]]=[null]}
        }
        else if (occurrence[words[i]] > 1   )
        {
            if(i != words.length -1){
                if (!dic[words[i]]) {
                    dic[words[i]] = [words[i+1]];
                }
                else{dic[words[i]].push(words[i+1]) }  
            }else{ dic[words[i]]=dic[words[i]].push(null)  }            
        }
    }     
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

let mm = new MarkovMachine("the cat in the hat");
mm.makeChains();

 
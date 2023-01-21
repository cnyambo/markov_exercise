const { MarkovMachine, constructor, makeChains, makeText } = require("./markov");

describe('Test the constructor, and functions  makeChains and makeTest',  () => {
    let text;

    beforeEach( () => {
        text = new MarkovMachine("in the cat in the cat in the cat in the hat");
    });
    
    test('constructor should return a dictionary with array of text as value', () => {
        expect(text).toEqual({"words": ["in","the", "cat", "in", "the","cat", "in", "the","cat", "in", "the", "hat"]});
      });
      
      test('makeChains should return a chain of text', () => {
        let chain = text.makeChains();
        expect(chain).toEqual({ the: [ 'cat','cat','cat', 'hat' ], cat: [ 'in','in','in' ], in: [ 'the' ,'the','the','the'], hat: [ null ] });
      });

      test('makeTest should return a chain of text', () => {
        let txt = text.makeText();
        expect(txt).toEqual( expect.any(String) )  
      });  
})

const { MarkovMachine, constructor, makeChains, makeText } = require("./markov");

describe('Test the constructor, and functions  makeChains and makeTest', function () {
    let text;

    beforeEach(function () {
        text = new MarkovMachine("the cat in the hat");
    });
    
    test('constructor should return a dictionary with array of text as value', function () {
        expect(text).toEqual({"words": ["the", "cat", "in", "the", "hat"]});
      });
      
      test('makeChains should return a chain of text', function () {
        let chain = text.makeChains();
        expect(chain).toEqual({ the: [ 'cat', 'hat' ], cat: [ 'in' ], in: [ 'the' ], hat: [ null ] });
      });

      test('makeTest should return a chain of text', function () {
        let txt = text.makeText();
        expect(txt).toEqual( expect.any(String) )  
      });  
})

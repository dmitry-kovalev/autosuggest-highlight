var expect = require('chai').expect;
var parse = require('./parse');

describe('parse', function() {
  it('should highlight a single partial match', function() {
    expect(parse('Hello world', [[0, 4]])).to.deep.equal([
      {
        text: 'Hell',
        highlight: true
      },
      {
        text: 'o world',
        highlight: false
      }
    ]);
  });

  it('should highlight a single complete match', function() {
    expect(parse('Hello world', [[0, 11]])).to.deep.equal([
      {
        text: 'Hello world',
        highlight: true
      }
    ]);
  });

  it('should highlight multiple non-consecutive matches', function() {
    expect(parse('Hello world', [[2, 4], [6, 8]])).to.deep.equal([
      {
        text: 'He',
        highlight: false
      },
      {
        text: 'll',
        highlight: true
      },
      {
        text: 'o ',
        highlight: false
      },
      {
        text: 'wo',
        highlight: true
      },
      {
        text: 'rld',
        highlight: false
      }
    ]);
  });

  it('should highlight multiple consecutive matches', function() {
    expect(parse('Hello world', [[2, 4], [4, 8]])).to.deep.equal([
      {
        text: 'He',
        highlight: false
      },
      {
        text: 'll',
        highlight: true
      },
      {
        text: 'o wo',
        highlight: true
      },
      {
        text: 'rld',
        highlight: false
      }
    ]);
  });

  it('should not highlight the text if there are no matches', function() {
    expect(parse('Hello world', [])).to.deep.equal([
      {
        text: 'Hello world',
        highlight: false
      }
    ]);
  });

  it('should highlight second word when first word contains œ', function() {
    expect(parse('œuvre pompes test', [[6, 12]])).to.deep.equal([
      {
        text: 'œuvre ',
        highlight: false
      },
      {
        text: 'pompes',
        highlight: true
      },
      {
        text: ' test',
        highlight: false
      }
    ]);
  });

  it('should highlight only first word that contains œ', function() {
    expect(parse('œuvre pompes test', [[0, 5]])).to.deep.equal([
      {
        text: 'œuvre',
        highlight: true
      },
      {
        text: ' pompes test',
        highlight: false
      }
    ]);
  });
});

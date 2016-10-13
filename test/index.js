/**
 * Created by kzz555 on 16/10/13.
 */

var tc = require('../index');

describe('index', ()=> {
  describe('#filter(s)', ()=> {
    it('try word "sex"', (done)=> {
      tc.filter('Ur so sexy babe!',(err,filtered)=>{
        console.log(filtered)
        if(filtered == 'Ur so ***y babe!') done()
        else throw new Error('replace failed')
      })
    });
  })
});

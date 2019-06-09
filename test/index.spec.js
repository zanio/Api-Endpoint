import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { checkLetter } from '../utils/string'
import checkFloat from '../utils/checkfloat'



//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp);
//Our parent block

/*
  * Test the index /GET route and unnknown routes
  */
  describe('/GET user account info', () => {
      it('it should test for "/" route ', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
              done();
            });
      });
 
  });

  describe('checkLetter()',()=>{
    it('it checks if checkLetter function returns boolean',(done)=>{
      let arr = [false, true, false,true,true]
      expect(checkLetter(arr)).to.equal(false)
      done();
    })
  })

  describe('checkFloat()',()=>{
    it('it checks if checkFloat function returns false',(done)=>{
      let arr = 'as445'
      expect(checkFloat(arr)).to.equal(false)
      done();
    })

    it('it checks if checkFloat function returns float',(done)=>{
      let arr = '445.45'
      expect(checkFloat(arr)).to.equal(445.45)
      done();
    })
  })


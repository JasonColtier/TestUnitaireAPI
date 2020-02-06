import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';
import books from '../routes/books';


chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);


const pathBooks = path.join(__dirname, '../data/books.json');

describe("testIntegration",()=>{
    beforeEach(() => {
        resetDatabase(pathBooks, books.initialStructure)
        nock.cleanAll()
    });

    it('Get is not null',  (done) =>{
        server.po
        chai.request('http://localhost:8080')
            .get('/book')
            .end(function (err, res) {
    
                expect(res.body).to.be.a("object")
                // chek status 
                expect(res).to.have.status(200)
    
                // test if books is an array
                var parsedData = JSON.parse(res.text)
                expect(parsedData.books).to.be.a("array")
    
                //check that array is empty
                chai.expect((parsedData.books).length).to.equal(0)
    
                done();
            })
    })
});


// afterEach(() => {
//     resetDatabase(pathBooks, books.initialStructureOneBook)
// });

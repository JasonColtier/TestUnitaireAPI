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


describe("Test Intégration sur base de données vide", () => {
    
    beforeEach(() => {
        resetDatabase(pathBooks, books.initialStructure)
        nock.cleanAll()
    });

    describe("Requete GET", () => {
        it('Get is not null',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book')
                .end(function (err, res) {
                    expect(res).to.be.a("object");
        
                    done();
                })
        })
    
        it('response is 200',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book')
                .end(function (err, res) {
                
                    expect(res).to.have.status(200)    
                    done();
                })
        })
    
        it('books is an array',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book')
                .end(function (err, res) {        
                    expect(res.body.books).to.be.a("array")
        
                    done();
                })
        })
    
        it('books array is empty',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book')
                .end(function (err, res) {
                    expect((res.body.books).length).to.equal(0)
        
                    done();
                })
        })
    });
    describe("Requete POST", () => {
        it('answer is 200',  (done) =>{
            chai.request('http://localhost:8080')
                .post('/book')
                .send({
                    title: "Oui-Oui contre Elizabeth II",
                    years: 1990,
                    pages: 400
                  })
                  .end(function (err, res) {
                    //assert that the mocked response is returned
                    expect(res.statusCode).to.equal(200);
                    done();
                  });
        })
        it("message contains : book successfully added",  (done) =>{
            chai.request('http://localhost:8080')
                .post('/book')
                .send({
                    title: "Oui-Oui contre Elizabeth II",
                    years: 1990,
                    pages: 400
                  })
                  .end(function (err, res) {
                    expect(res.body.message).to.equal("book successfully added");
                    done();
                  });
        })
    });
});



describe("Test d'intégration sur base de données avec 1 livre", () => {
    beforeEach(() => {
        resetDatabase(pathBooks, books.initialStructureOneBook)
        nock.cleanAll()
    });

    it('response is 200',  (done) =>{
        chai.request('http://localhost:8080')
        .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .send({
            title: "Coco raconte Channel 2",
            years: 1990,
            pages: 400
        })
        .end(function (err, res) {
            //assert that the mocked response is returned
            console.log("error res : "+res.text)
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal("book successfully updated");
            done();
        });
    })

    it("message contains : book successfully added",  (done) =>{
        chai.request('http://localhost:8080')
            .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .send({
                title: "Coco raconte Channel 2",
                years: 1990,
                pages: 400
              })
              .end(function (err, res) {
                expect(res.body.message).to.equal("book successfully updated");
                done();
              });
    })

    it('books is an array',  (done) =>{
        chai.request('http://localhost:8080')
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .end(function (err, res) {
    
                //var parsedData = res
                console.log(res.body.book);
                expect(res.body.book.title).to.be.a("string")
    
                done();
            })
    })
    
});

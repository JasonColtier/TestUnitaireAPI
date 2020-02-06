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

    describe("Requete PUT", () => {
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
                expect(res.statusCode).to.equal(200);
                done();
            });
        })
    
        it("message contains : book successfully updated",  (done) =>{
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
    });

    describe("Requete DELETE", () => {
        it('response is 200',  (done) =>{
            chai.request('http://localhost:8080')
          .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
          .end(function (err, res) 
          {
            //assert that the mocked response is returned
            expect(res.statusCode).to.equal(200);
            done();
          });
        })
    
        it('message contains : book successfully deleted',  (done) =>{
            chai.request('http://localhost:8080')
          .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
          .end(function (err, res) 
          {
            //assert that the mocked response is returned
            expect(res.body.message).to.equal('book successfully deleted');
            done();
          });
        })
    });
    
    describe("Requete GET", () => {
        beforeEach(() => {
            resetDatabase(pathBooks, books.initialStructureOneBook)
            nock.cleanAll()
        });


        it('response is 200',  (done) =>{
            chai.request('http://localhost:8080')
          .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
          .end(function (err, res) 
          {
            expect(res.statusCode).to.equal(200);
            done();
          });
        })
    
        it('message contains : book fetched',  (done) =>{
            chai.request('http://localhost:8080')
          .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
          .end(function (err, res) 
          {
            expect(res.body.message).to.equal('book fetched');
            done();
          });
        })
    
        it('Get is an Object',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                    expect(res.body.book).to.be.a("object")
        
                    done();
                })
        })
    
        it('TItle in book is an string',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {                    
                    expect(res.body.book.title).to.be.a("String")
        
                    done();
                })
        })

        it('Title is the same in mocked database',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {   
                    expect(res.body.book.title).to.be.equal("Coco raconte Channel 2");
                    done();

                });
        })
    
        it('Years in book is a number',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                    expect(res).to.not.be.null;
    
                    expect(res.body.book.years).to.be.a("number")
        
                    done();
                })
        })

        it('Years is the same in mocked database',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {   
                    expect(res.body.book.years).to.be.equal(1990);
                    done();

                });
        })
    
    

        it('Pages in book is a number',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                    expect(res).to.not.be.null;
    
                    expect(res.body.book.pages).to.be.a("number")
        
                    done();
                })
        })

        it('Pages is the same in mocked database',  (done) =>{
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {   
                    expect(res.body.book.pages).to.be.equal(400);
                    done();

<<<<<<< HEAD
                    const requestNock = nock('http://localhost:8080')
                    .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                    .reply(200, {
                        books: [{"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":404}]
                    });
                
                    chai.request('http://localhost:8080')
                    .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                    .end(function (err, res) {
                        expect(res.body.books[0].pages).to.be.equal(pagesInDatabase);
                        done();
                    });
=======
>>>>>>> master
                });
        })
    });
});

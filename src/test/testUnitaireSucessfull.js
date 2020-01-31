import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// PREMIERE SERIE DE TEST UNITAIRE - SIMU DE REPONSE OK 
//GET
it('requestGET', function(done) {
    const requestNock = nock('http://localhost:8080')
      .get('/book')
      .reply(200, {
            books: []
      });

      chai.request('http://localhost:8080')
      .get('/book')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(200);
        expect(res.body.books).to.be.a('array');
        done();
      });
});

//POST
it('requestPOST', function(done) {
    const requestNock = nock('http://localhost:8080')
      .post('/book')
      .reply(200, {
            message: "book successfully added"
      });

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
        expect(res.body.message).to.equal("book successfully added");
        done();
      });
});

//PUT
it('requestPUT', function(done) {
    const requestNock = nock('http://localhost:8080')
      .put('/book/1')
      .reply(200, {
            message: "book successfully updated"
      });

      chai.request('http://localhost:8080')
      .put('/book/1')
      .send({
        title: "Oui-Oui contre Elizabeth II",
        years: 1990,
        pages: 400
      })
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal("book successfully updated");
        done();
      });
});

//DELETE
it('requestDELETE', function(done) {
    const requestNock = nock('http://localhost:8080')
      .delete('/book/0')
      .reply(200, {
            message: "book successfully deleted"
      });

      chai.request('http://localhost:8080')
      .delete('/book/0')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal("book successfully deleted");
        done();
      });
});

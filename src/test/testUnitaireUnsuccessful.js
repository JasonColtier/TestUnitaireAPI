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



it('get unsuccessful', function(done) {
    const requestNock = nock('http://localhost:8080')
      .get('/book')
      .reply(400, {
          'message' : 'error fetching books'
        });

      chai.request('http://localhost:8080')
      .get('/book')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('error fetching books');

        done();
      });
});

it('get with id unsuccessful', function(done) {
    const requestNock = nock('http://localhost:8080')
      .get('/book/0')
      .reply(400, {
          'message' : 'error fetching books'
        });

      chai.request('http://localhost:8080')
      .get('/book/0')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('error fetching books');

        done();
      });
});

it('post unsuccessful', function(done) {
    const requestNock = nock('http://localhost:8080')
      .post('/book')
      .reply(400, {
        'message' : 'error adding books'
      });
      chai.request('http://localhost:8080')
      .post('/book')
      .send({
        title: 'Coco raconte Channel 2',
        years: 1990,
        pages: 400
        
      })
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('error adding books');

        done();
      });
});

it('put unsuccessful', function(done) {
    const requestNock = nock('http://localhost:8080')
      .put('/book/0')
      .reply(400, {
        'message' : 'error updating the book'
      });
      chai.request('http://localhost:8080')
      .put('/book/0')
      .send({
        title: 'Coco raconte Channel 2',
        years: 1990,
        pages: 400
      })
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('error updating the book');

        done();
      });
});

it('delete unsuccessful', function(done) {
    const requestNock = nock('http://localhost:8080')
      .delete('/book/0')
      .reply(400, {
        'message' : 'error deleting books'
      });
      chai.request('http://localhost:8080')
      .delete('/book/0')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('error deleting books');

        done();
      });
});


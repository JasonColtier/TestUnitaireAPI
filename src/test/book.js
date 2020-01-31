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

// fait les Tests d'integration en premier
it('requested', function(done) {
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

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
});

describe('Testa o método GET em /amenities', () => {
  describe('Testa a rota /amenities/rental/:id', () => {
    it('Deve retornar todos os serviços de um apartamento', async () => {
      sinon
        .stub(connection, 'execute')
        .resolves(require('../mocks/amenities/rental2SQLResponse.json'));

      const response = await chai.request(app).get('/amenities/rental/2');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(
        require('../mocks/amenities/rental2Result.json')
      );
    });

    it('Caso não haja serviços deve retornar um array vazio com status 200', async () => {
      sinon.stub(connection, 'execute').resolves(JSON.parse('[[]]'));

      const response = await chai.request(app).get('/amenities/rental/2');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([]);
    });
  });
});

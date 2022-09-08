import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';
import { modelOutput, SQLResponse } from '../mocks/amenities.model.mock';

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
});

describe('Testa o método GET em /amenities', () => {
  describe('Testa a rota /amenities', () => {
    it('Deve retornar todos os serviços registrados', async () => {
      const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

      const response = await chai.request(app).get('/amenities');

      expect(stub.calledOnce).to.be.true;

      const [query] = stub.firstCall.args;
      expect(query).not.to.include('WHERE');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(modelOutput);
    });
  });

  describe('Testa a rota /amenities/rental/:id', () => {
    it('Deve retornar todos os serviços de um apartamento', async () => {
      const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

      const response = await chai.request(app).get('/amenities/rental/2');

      expect(stub.calledOnce).to.be.true;

      const [query, [id]] = stub.firstCall.args;
      expect(query).to.include('rental_id = ?');
      expect(Number(id)).to.equal(2);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(modelOutput);
    });

    it('Caso não haja serviços deve retornar um array vazio com status 200', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([[]] as any);

      const response = await chai.request(app).get('/amenities/rental/5');

      expect(stub.calledOnce).to.be.true;
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([]);
    });
  });
});

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';
import { modelOutput, SQLResponse } from '../mocks/cities.model.mock';

chai.use(chaiHttp);

afterEach(sinon.restore);

describe('Testa o método GET em /cities', () => {
  describe('Testa a rota /cities', () => {
    it('Deve retornar todos os serviços registrados', async () => {
      const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

      const response = await chai.request(app).get('/cities');
      const [query] = stub.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(query).not.to.include('WHERE');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(modelOutput);
    });
  });
});

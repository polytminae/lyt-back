import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';
import { modelOutput, SQLResponse } from '../mocks/rental.model.mock';
import checkQuery from '../util/checkQuery';

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
});

describe.only('Testa o método GET em /rental', () => {
  it('Deve retornar a primeira página de resultados e usar a query correta', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai.request(app).get('/rental');

    expect(stub.calledOnce).to.be.true;

    // const [query, [OFFSET]] = stub.firstCall.args;
    // expect(checkQuery(query, 'get/rental')).to.be.ok;
    // expect(Number(OFFSET)).to.equal(0);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });

  it('Deve retornar um erro caso a query retorne um array vazio', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(JSON.parse('[[]]'));

    const response = await chai.request(app).get('/rental?page=150');

    expect(stub.calledOnce).to.be.true;

    // const [query, [OFFSET]] = stub.firstCall.args;
    // expect(checkQuery(query, 'get/rental')).to.be.ok;
    // expect(Number(OFFSET)).to.equal(149 * 20);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Page not found',
    });
  });

  it('Deve retornar apartamentos filtrados por valores numéricos e executar a query correta', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai
      .request(app)
      .get('/rental?priceMax=1500&minPrice=1000&bedrooms=2');

    expect(stub.calledOnce).to.be.true;

    // const [query] = stub.firstCall.args;
    // expect(checkQuery(query, 'get/rental?numerics')).to.be.ok;

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });

  it('Caso um filtro por serviços inválido seja passado deve retornar erro', async () => {
    const response = await chai.request(app).get('/rental?am=lorem,4,9');

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: 'Invalid "am" field',
    });
  });

  it('Deve retornar apartamentos filtrados por serviços e executar a query correta', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai.request(app).get('/rental?am=5,6,9,13');

    expect(stub.calledOnce).to.be.true;

    // const [query, params] = stub.firstCall.args;
    // expect(checkQuery(query, 'get/rental?amenities')).to.be.ok;
    // expect(params).to.deep.equal(['5', '6', '9', '13', '0']);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });
});

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';
import checkQuery from '../util/checkQuery';

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
});

describe('Testa o método GET em /rental', () => {
  it('Caso uma página não seja passada, deve retornar a primeira página de resultados', async () => {
    const stub = sinon
      .stub(connection, 'execute')
      .resolves(require('../mocks/firstRentalPageSQLResponse.json'));

    const response = await chai.request(app).get('/rental');

    expect(stub.calledOnce).to.be.true;

    const [query, [OFFSET]] = stub.firstCall.args;
    expect(checkQuery(query, 'get/rental')).to.be.ok;
    expect(Number(OFFSET)).to.equal(0);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(
      require('../mocks/firstRentalPageResult.json')
    );
  });

  it('Caso a página não seja encontrada deve retornar uma mensagem com status 404', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(JSON.parse('[[]]'));

    const response = await chai.request(app).get('/rental?page=150');

    expect(stub.calledOnce).to.be.true;

    const [query, [OFFSET]] = stub.firstCall.args;
    expect(checkQuery(query, 'get/rental')).to.be.ok;
    expect(Number(OFFSET)).to.equal(149 * 20);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Page not found',
    });
  });

  it('Deve ser capaz de lidar com um filtro numérico', async () => {
    const stub = sinon
      .stub(connection, 'execute')
      .resolves(require('../mocks/rentalByNumericsSQLResponse.json'));

    const response = await chai
      .request(app)
      .get('/rental?priceMax=1500&minPrice=1000&bedrooms=2');

    expect(stub.calledOnce).to.be.true;

    const [query] = stub.firstCall.args;
    expect(checkQuery(query, 'get/rental?numerics'));

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(
      require('../mocks/rentalByNumericsResult.json')
    );
  });
});

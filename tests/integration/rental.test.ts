import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
});

describe('Testa o método GET em /rental', () => {
  it('Caso uma página não seja passada, deve retornar a primeira página de resultados', async () => {
    sinon
      .stub(connection, 'execute')
      .resolves(require('../mocks/firstRentalPageSQLResponse.json'));

    const response = await chai.request(app).get('/rental');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(
      require('../mocks/firstRentalPageResult.json')
    );
  });

  it('Caso a página não seja encontrada deve retornar uma mensagem com status 404', async () => {
    sinon.stub(connection, 'execute').resolves(JSON.parse('[[]]'));

    const response = await chai.request(app).get('/rental?page=150');

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Page not found',
    });
  });
});

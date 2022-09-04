import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
import connection from '../../src/models/connection';

chai.use(chaiHttp);

describe('Testa o método GET em /rental', () => {
  afterEach(() => {
    sinon.restore();
  });

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
});

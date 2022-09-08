import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/models/connection';
import { modelOutput, SQLResponse } from '../mocks/rental.model.mock';

chai.use(chaiHttp);

afterEach(sinon.restore);

describe('Testa o método GET em /rental', () => {
  it('Deve retornar a primeira página de resultados e usar a query correta', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai.request(app).get('/rental');
    const [query, [OFFSET]] = stub.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(query).not.to.include('WHERE');
    expect(Number(OFFSET)).to.equal(0);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });

  it('Deve retornar um erro caso a query retorne um array vazio', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(JSON.parse('[[]]'));

    const response = await chai.request(app).get('/rental?page=150');
    const [, [OFFSET]] = stub.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(Number(OFFSET)).to.equal(149 * 20);
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Page not found',
    });
  });

  it('Deve retornar apartamentos filtrados por valores numéricos', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai
      .request(app)
      .get('/rental?rent[max]=1500&rent[min]=1000&bedrooms=2');
    const [query] = stub.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(query).to.include('rent BETWEEN 1000 AND 1500');
    expect(query).to.include('bedrooms = 2');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });

  it('Caso um filtro por serviços inválido seja passado deve retornar erro', async () => {
    const response = await chai.request(app).get('/rental?am=lorem,4,9');

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: 'Bad Request',
    });
  });

  it('Deve retornar apartamentos filtrados por serviços', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai.request(app).get('/rental?am=5,6,9,13');
    const [query, params] = stub.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(query).to.include('amenity_id IN (?,?,?,?)');
    expect(query).to.include('GROUP BY re.id');
    expect(query).to.include('HAVING COUNT(am_re.amenity_id) = 4');
    expect(params).to.deep.equal(['5', '6', '9', '13', '0']);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });

  it('Deve retornar apartamentos filtrados por cidade e estado', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai
      .request(app)
      .get('/rental?state=2,4&city=10,11&am=4');
    const [query, params] = stub.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(query).to.include('st.id IN (?,?)');
    expect(query).to.include('ci.id IN (?,?)');
    expect(params).to.deep.equal(['4', '2', '4', '10', '11', '0']);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput);
  });
});

describe('Testa o método GET em /rental/:id', () => {
  it('Deve retornar o primeiro resultado', async () => {
    const stub = sinon.stub(connection, 'execute').resolves(SQLResponse);

    const response = await chai.request(app).get('/rental/456');
    const [query, [id]] = stub.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(query).to.include('WHERE re.id = ?');
    expect(id).to.equal(456);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(modelOutput.rental[0]);
  });

  it('Caso não encontre nada deve retornar status 404', async () => {
    const stub = sinon.stub(connection, 'execute').resolves([[]] as any);

    const response = await chai.request(app).get('/rental/5555');

    expect(stub.calledOnce).to.be.true;
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'Realty not found',
    });
  });

  it('Caso o id seja inválido deve retornar status 400', async () => {
    const stub = sinon.stub(connection, 'execute').resolves([[]] as any);

    const response = await chai.request(app).get('/rental/lorem');

    expect(stub.called).to.be.false;
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: 'Invalid ID',
    });
  });
});

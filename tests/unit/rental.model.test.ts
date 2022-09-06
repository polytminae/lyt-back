import { expect } from 'chai';
import sinon from 'sinon';
import RentalNumericFilters from '../../src/interfaces/RentalNumericFilters.interface';
import connection from '../../src/models/connection';
import RentalModel from '../../src/models/rental.model';

describe('Testes unitários do modelo para acesso da tabela Rental', () => {
  context('Testa as ternárias da função getByNumerics', () => {
    const model = new RentalModel(connection);

    const page = 1;
    const defaultFilters = {
      price: {
        max: 1000,
        min: 500,
      },
      area: {
        max: 100,
        min: 20,
      },
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
    };

    it('Deve utilizar ~0 na query quando nenhum valor máximo for passado', async () => {
      const stub = sinon
        .stub(connection, 'execute')
        .resolves(JSON.parse('[[]]'));

      const filter: RentalNumericFilters = {
        ...defaultFilters,
        price: {
          max: 0,
          min: 500,
        },
        area: {
          max: 0,
          min: 20,
        },
      };

      await model.getByNumerics(page, filter);
      const [query] = stub.lastCall.args as string[];

      expect(query.match(/~0/g)).to.have.lengthOf(2);
    });

    it('Deve utilizar >= na query quando valores maiores ou iguais à 4 forem passados', async () => {
      const stub = sinon
        .stub(connection, 'execute')
        .resolves(JSON.parse('[[]]'));

      const filter: RentalNumericFilters = {
        ...defaultFilters,
        bedrooms: 5,
        bathrooms: 5,
        parking: 5,
      };

      await model.getByNumerics(page, filter);
      const [query] = stub.lastCall.args as string[];

      expect(query.match(/>=/g)).to.have.lengthOf(3);
    });

    it('Deve utilizar = na query quando valores menores que 4 forem passados', async () => {
      const stub = sinon
        .stub(connection, 'execute')
        .resolves(JSON.parse('[[]]'));

      const filter: RentalNumericFilters = {
        ...defaultFilters,
        bedrooms: 2,
        bathrooms: 2,
        parking: 2,
      };

      await model.getByNumerics(page, filter);
      const [query] = stub.lastCall.args as string[];

      expect(query.match(/\s=\s2/g)).to.have.lengthOf(3);
    });

    it('Deve utilizar 0 quando um valor não for passado', async () => {
      const stub = sinon
        .stub(connection, 'execute')
        .resolves(JSON.parse('[[]]'));

      const filter: RentalNumericFilters = {
        ...defaultFilters,
        bedrooms: NaN,
        bathrooms: NaN,
        parking: NaN,
      };

      await model.getByNumerics(2, filter);
      const [query] = stub.lastCall.args as string[];

      expect(query.match(/\s0/g)).to.have.lengthOf(3);
    });

    afterEach(sinon.restore);
  });
});

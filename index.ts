import dotenv from 'dotenv';
import app from './src/app';
import connection from './src/models/connection';
import RentalModel from './src/models/rental.model';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log('Servidor rodando na porta', PORT);

  const model = new RentalModel(connection);
  const opa = await model.getByPage(1);
  console.log(opa);
});

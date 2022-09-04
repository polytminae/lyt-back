import dotenv from 'dotenv';
import app from './src/app';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log('Servidor rodando na porta', PORT);
});

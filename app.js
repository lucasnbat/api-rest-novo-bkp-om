import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import fotoRoutes from './src/routes/fotoRoutes';
import './src/database'; // já chama o index.js automatico

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json()); // para trabalhar com json na app
    this.app.use(express.static(resolve(__dirname, 'uploads'))); // caminho para arquivos estaticos
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes); // adicionando a rota de token
    this.app.use('/alunos', alunoRoutes); // adicionando a rota de aluno
    this.app.use('/fotos', fotoRoutes); // adicionando a rota de foto
  }
}

export default new App().app; // exportando a app (que na vdd é o express)

import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';
import './database'; // já chama o index.js automatico

dotenv.config();

// const whiteList = [
//   'http://localhost:3001',
//   'http://192.168.100.200:3001',
//   'http://192.168.100.200',
// ];

// const corsOptions = {
//   origin(origin, callback) {
//     if (whiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true); // permite o site
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors()); // permite que outras aplicações acessem a api
    this.app.use(helmet()); // adiciona segurança a aplicação
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json()); // para trabalhar com json na app
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images'))); // caminho para arquivos estaticos
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

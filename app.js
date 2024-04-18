import express from 'express';
import dotenv from 'dotenv';
import homeRoutes from './src/routes/homeRoutes';
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
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app; // exportando a app (que na vdd é o express)

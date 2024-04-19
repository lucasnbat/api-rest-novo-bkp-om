"use strict";Object.defineProperty(exports, "__esModule", {value: true});// import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.json('HomeController: index');
  }
}

exports. default = new HomeController(); // exportando classe já instanciada

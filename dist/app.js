"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);
require('./database'); // já chama o index.js automatico

_dotenv2.default.config();

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json()); // para trabalhar com json na app
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, 'uploads'))); // caminho para arquivos estaticos
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/users', _userRoutes2.default);
    this.app.use('/tokens', _tokenRoutes2.default); // adicionando a rota de token
    this.app.use('/alunos', _alunoRoutes2.default); // adicionando a rota de aluno
    this.app.use('/fotos', _fotoRoutes2.default); // adicionando a rota de foto
  }
}

exports. default = new App().app; // exportando a app (que na vdd é o express)

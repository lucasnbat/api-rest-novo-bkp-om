"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  // se não tem autorização, retorna erro
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    // dados são gerados a partir do id e email do token
    // uso o mesmo TOKEN_SECRET para verificar
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    // posso extrair de volta o id e email
    const { id, email } = dados;

    const user = await _User2.default.findOne({
      where: { id, email },
    });

    // verificar se o id e email batem com algum email existente no BD
    // (trocou o email, por exemplo, não vai bater mais)
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    // inserindo os dados estraídos na requisição feita antes do middleware
    req.userId = id;
    req.userEmail = email;

    return next(); // continua a execução
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};

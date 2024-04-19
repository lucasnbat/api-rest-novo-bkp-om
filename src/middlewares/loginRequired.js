import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
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
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    // posso extrair de volta o id e email
    const { id, email } = dados;

    const user = await User.findOne({
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

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
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

// um model é referente a uma tabela no banco de dados
/* password: Sequelize.VIRTUAL
   campo que não existe na base de
    dados mas usada para gerar o hash */

import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    // todos os campos não automáticos devem ser informados
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Campo nome deve ter entre 2 e 255 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        // configurar mensagem que aparece ao repetir email
        unique: {
          msg: 'Email já existe.',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Campo senha deve ter entre 6 e 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });

    // antes de salvar, gerar o password hash e salvar no campo password_hash
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

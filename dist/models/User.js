"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// um model é referente a uma tabela no banco de dados
/* password: Sequelize.VIRTUAL
   campo que não existe na base de
    dados mas usada para gerar o hash */

var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class User extends _sequelize.Model {
  static init(sequelize) {
    // todos os campos não automáticos devem ser informados
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Campo nome deve ter entre 2 e 255 caracteres.',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  // validação de senha que será chamada no TokenController
  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;

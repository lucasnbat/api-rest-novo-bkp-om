// um model é referente a uma tabela no banco de dados
import Sequelize, { Model } from 'sequelize';

export default class Foto extends Model {
  static init(sequelize) {
    // todos os campos não automáticos devem ser informados
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  // essa foto pertence ao Aluno por meio da chave estrangeira aluno_id
  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}

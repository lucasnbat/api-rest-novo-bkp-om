// um model é referente a uma tabela no banco de dados
import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static(sequelize) {
    // todos os campos não automáticos devem ser informados
    super.init({
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: Sequelize.STRING,
      idade: Sequelize.INTEGER,
      peso: Sequelize.FLOAT,
      altura: Sequelize.FLOAT,
    }, {
      sequelize,
    });
    return this;
  }
}

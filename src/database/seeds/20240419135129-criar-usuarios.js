const bcryptjs = require('bcryptjs');

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'Luiz',
        email: 'luiz@unemat.br',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Lucas',
        email: 'lucas@unemat.br',
        password_hash: await bcryptjs.hash('654321', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Marcos',
        email: 'marcos@unemat.br',
        password_hash: await bcryptjs.hash('654123', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => { },
};

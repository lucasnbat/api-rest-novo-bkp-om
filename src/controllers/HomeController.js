import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Lucas',
      sobrenome: 'Fernandes',
      email: 'lucas@unemat.br',
      idade: 23,
      peso: 90,
      altura: 1.80,
    });
    res.json(novoAluno);
  }
}

export default new HomeController(); // exportando classe já instanciada

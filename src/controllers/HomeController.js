import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Maria',
      sobrenome: 'Aragão',
      email: 'maria@unemat.br',
      idade: 27,
      peso: 60,
      altura: 1.80,
    });
    res.json(novoAluno);
  }
}

export default new HomeController(); // exportando classe já instanciada

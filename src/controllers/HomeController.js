// import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.json('HomeController: index');
  }
}

export default new HomeController(); // exportando classe já instanciada

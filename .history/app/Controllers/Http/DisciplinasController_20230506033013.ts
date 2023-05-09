import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // contem todas as informacoes da requisicao 

export default class DisciplinasController {
    public async store() {
        return {
            msg: "Deu certo", 
        }
    }
}

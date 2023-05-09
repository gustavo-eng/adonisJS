import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // contem todas as informacoes da requisicao 

// captura tudo que esta sendo enviado na request 

export default class DisciplinasController {
    public async store() {
        return {
            msg: "Deu certo", 
        }
    }
}

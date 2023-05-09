import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // contem todas as informacoes da requisicao 

// HttpContextContract captura tudo que esta sendo enviado na request 
import Disciplina from 'App/Models/Disciplina'

export default class DisciplinasController {
    public async store({request, response} : HttpContextContract) {

        return {
            msg: "Deu certo", 
        }
    }
}

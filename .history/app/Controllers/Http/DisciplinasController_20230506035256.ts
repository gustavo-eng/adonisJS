import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // contem todas as informacoes da requisicao 

// HttpContextContract captura tudo que esta sendo enviado na request 
import Disciplina from 'App/Models/Disciplina'
import Application from '@ioc:Adonis/Core/Application'

export default class DisciplinasController {

    private validationOptions = { // .? 
        type: ["image"],
        size: '2mb'
    }

    public async store({request, response} : HttpContextContract) {
        const body = request.body()
        const disciplina  = await Disciplina.create(body) // .create() metodo da ORM  - tudo que  esta no body sera enviado para "disciplina"

        const image = request.file('image', this.validationOptions)

        if(image)  {
            const imageName = `${uuidv4}.${image.extname}`
            await image.move(Application.tmpPath)
        }

        response.status(201)
        return {
            // body,
            message: "Disciplina criada com sucesso",
            data: disciplina, // envia a entidade que acabou de ser criada

        }
    }
}



// import {v4 as uuidv4} from 'uuid'


import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // contem todas as informacoes da requisicao 

// HttpContextContract captura tudo que esta sendo enviado na request 
import Disciplina from 'App/Models/Disciplina'
// import Application from '@ioc:Adonis/Core/Application'

export default class DisciplinasController {

    public async store({request, response} : HttpContextContract) {
        console.log('ENTROU NA STORE de DisciplinasControllers')
        const body = request.body()
       
        // const image = request.file('image', {size: '2mb', extnames:['png', 'jpg', 'gif']})
        // if(image)  {
        //     const imageName = `${uuidv4()}.${image.extname}`
            
        //     await image.move(Application.tmpPath('uploads'), {
        //         name: imageName, // customização da imagem 
        //         //salvar a imagem no corpo da requisicao para salvar no banco o nome da imagem 
        //     })
            
        //     body.image = imageName 
            
        // } else {
        //     return 
        // }
        const disciplina  = await Disciplina.create(body) // .create() metodo da ORM  - tudo que  esta no body sera enviado para "disciplina"
        
        response.status(201).json(disciplina)
        return {
            // body,
            message: "Disciplina criada com sucesso",
            data: disciplina, // envia a entidade que acabou de ser criada

        }
    }

    public async  index({response} : HttpContextContract) {
        console.log('ENTROU NA INDEX de DisciplinasControllers')

        const disciplinas = await Disciplina.all()
        if (disciplinas) {
            response.status(200).json(disciplinas)

        } else  {
            response.status(404).send("Not found ")
        }

    }

    public async show({request, response}: HttpContextContract) {
        console.log('ENTROU NA SHOW de DisciplinasControllers')
        const id = request.param('id')
        const disciplinas = await Disciplina.find(id)
        if(disciplinas) {
            response.status(200).json(disciplinas)

        } else { 
            response.status(404).json({msg: "Course not found !"})
        }
        
    }

    public async destroy({request, response}: HttpContextContract) {
        console.log('ENTROU NA DESTROY de DisciplinasControllers')
        const disciplina = await Disciplina.find(request.param('id'))
        if(!disciplina) {
            response.send("Not ")
        }
        
        response.send(disciplina)
        await disciplina?.delete()
        response.status(204).json(disciplina)
        
    }

    public async update({params, request,response}:HttpContextContract) { 
        console.log('ENTROU NA UPDATE de DisciplinasControllers')
        
        // const disciplina = await Disciplina.find(request.param('id'));
        
        // disciplina
        const searchPayload = {id: params.id}
        const persistencePayload = { 
            name: request.body().name, 
            description: request.body().description, 
            period: request.body().period 
        }   

        const disciplina = await Disciplina.updateOrCreate(searchPayload, persistencePayload)
        disciplina.save() // atualizacao  de um dado ja existente 
        response.status(200).json(disciplina)
        
    }

}














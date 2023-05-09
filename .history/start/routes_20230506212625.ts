/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  // Route.post('/disciplinas', "DisciplinasController.store")
  // Route.get('/disciplinas', "DisciplinasController.index")
  // Route.get('/disciplinas/:id', "DisciplinasController.show")
  // Route.put('/disciplinas/:id', "DisciplinasController.update")
  // Route.delete('/disciplinas/:id', "DisciplinasController.destroy")

  Route.resource('/disciplinas', "DisciplinasController").apiOnly() // cria automaticamente as principais rotas que a entidade vai precisar 
  // .apyOnly -> traz apenas rotas de api para o controller 
  // sem isso rotas para outras  funcoes sao criadas 

}).prefix('/api')

import Disciplina from 'App/Models/Disciplina'

Route.group(() => {
  Route.get('/disciplina', async ({response}) => {
    response.status(200).json(await Disciplina.all())
  })

  Route.post('/disciplinas', async ({response, request}) => {
    const body = request.body() 
    const disciplina = await Disciplina.create(body)
    
    response.status(201).json(disciplina)
    
  })

  Route.get('/disciplina/:id', async ({request, response }) => {
  
    const disciplina = await Disciplina.find(request.param('id'))
    response.status(200).json(disciplina)

  })


  Route.delete('/disciplina/:id', async ({request, response}) => {

    
    const disciplina = await Disciplina.find(request.param('id'))
    
    await disciplina?.delete().then(() =>{ // disciplina porde n existir 
      response.send('disciplina deletada com sucesso')
      console.log('disciplina deletada com sucesso')
    }).catch(() => {
      response.send('Falha ao deletar disciplina ')
      console.log('Falha ao deletar disciplina ')
    }) 
    
    // response.status(200).json(disciplina)
    
  })

  Route.put('/disciplina/:id', ({response, params, request}) => {
    
    const searchPayload = {id: params.id}
    const persistencePayload = { 
        name: request.body().name, 
        description: request.body().description, 
        period: request.body().period 
    }   

    const disciplina = await Disciplina.updateOrCreate(searchPayload, persistencePayload)
    disciplina.save() // atualizacao  de um dado ja existente 
    response.status(200).json(disciplina) 

  })

}).prefix('/rotas') 







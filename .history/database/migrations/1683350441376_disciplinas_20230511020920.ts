import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'disciplinas'


  // RESPONSAVEL POR AJUDAR A CRIAR A TABELA 
  public async up () {
    
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.integer('period')
      // table.string('image')
      

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL   
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


// Reflete dados dos model no banco dedos 


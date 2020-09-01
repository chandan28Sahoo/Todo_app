var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'chandan19',
      database : 'todo_app'
    }
});

module.exports=knex;
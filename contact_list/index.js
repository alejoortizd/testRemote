const app = require('./app');
const DB = require('./config/bd');

// Connect to bd
DB.connect();

// app
const server = app.listen(app.get('port'), () => {
  console.log(`Listen at port: ${server.address().port}`)
})

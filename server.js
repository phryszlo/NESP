const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')

const app = express()

var corsOptions = {
  origin: ['http://localhost:8081','http://45.55.50.36:8081']
}



app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:8081','http://45.55.50.36:8081']
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

//app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true}))

const db = require('./app/models')
db.sequelize.sync()

app.get('/', (req, res) => {
  res.json({ message: 'Wilkopmmen auf bezkoder apfelkashun'})
})

require('./app/routes/tutorial.routes')(app)
require('./app/routes/ms_event.routes')(app)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`)
})

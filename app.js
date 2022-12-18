let express = require('express')
let app = express()
let port = 3000
let models = require("./models/index");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function logUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }
  
  app.get('/province', logUrl, (req, res) => {
    let findProvince = models.Provinces.findAll().then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not Available"})
        }
        res.json(findProvince)
    })
})

app.get('/province/:id', (req, res) => {
    let findProvince = models.Provinces.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(findProvince)
    })
})
app.post('/province', (req, res) => {
    let createProvince = models.Provinces.bulkCreate(req.body)
    if (!createProvince) {
        console.error('Error create provinces!')
    }

    res.json(req.body)
})
  
app.get('/city', logUrl, (req, res) => {
    let findCity = models.Cities.findAll().then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(findCity)
    })
})
app.get('/city/:id', (req, res) => {
    let findCity = models.Cities.findOne({ where: {id: req.params.id} }).then(function(result) {
        if (result.length < 1) {
            res.json({message: "Data not available"})
        }
        
        res.json(findCity)
    })
})
app.post('/city', (req, res) => {
    let createCity = models.Cities.bulkCreate(req.body)
    if (!createCity) {
        console.error('Error create city!')
    }

    res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

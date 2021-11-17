const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.use(express.static(path.join(__dirname, "../public")))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Malayah',
        name: 'Mashari'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'CJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is the help page',
        title: 'Help',
        name: 'Calvin Jones'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'   
        })
    }
   
    const address = req.query.address
    geocode(address, (error, {lat, long, location} = {}) => {
        
        if (error){
            return res.send({
                error: error   
            })
        }
        
        forecast(lat, long, (error, forecastData) => {
    
            if (error){
                return res.send({ error })
            }
            
            //destruction was not used below, instead used foracastData
            const {weatherDescription, temp, feelslike, region} = forecastData
          
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })

    
    
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'   
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title: '404!',
        error: '404 Help Page URL Not Found',
        name: 'Help Footer'
    })
})

//Orders matter, but wildcard last for 404 page
app.get('*', (req, res) => {
    res.render('404page',{
        title: '404!',
        error: '404 Page Note Found',
        name: '404 Footer'
    })
})

app.listen(port, () => {
    console.log('Server is up on port on ' + port)
})
//end
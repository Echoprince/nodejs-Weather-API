const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast  = require('./utils/forcast')

const app = express()
const port  = process.env.PORT || 3000

//Setting Up Directories paths
const templates = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')
const publicFile =  path.join(__dirname, '../public')

//Setting Up View Engine 
app.set('view engine', 'hbs')
app.set('views', templates )
hbs.registerPartials(partials)

//Serving up static files
app.use(express.static(publicFile))

/**
 * req - is an object with several properties
 * res - used several methods
 */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Uchenna Prince',
        pageTitle: "Index"
    })
})

app.get('/help', (req, res) => {
res.render('help', {
    helpText: "I hope this helps you!",
    title: 'Help Page',
    name: 'Uchenna Prince',
    pageTitle: "Help"
    })
})

app.get('/about', (req, res) => {
res.render("about", {
    name: "Uchenna Prince",
    title: "About Page",
    pageTitle: "About"
    
})
})

app.get('/weather', (req, res) => {

    if(!req.query.address){

    return res.send({error: true, message: 'Please provide an address'})

    }else {

        geocode(req.query.address, (error, {lat, long, location} = {}) => {
            if(error){
                return res.send({error})
            }

            forcast(lat, long, (error, forcastData) => {

                if(error){
                    return res.send({error})
                }

                res.send({data: forcastData,location, address: req.query.address})

            })

        })

    }
})
    

app.use('*',(req, res) => {
    res.render('error', {
        title: 'Sorry Cannot find the Page',
        pageTitle: "404 Page"
    })
})


app.listen(port, () => {
    console.log(`App is running on port ${port}`)
    
})


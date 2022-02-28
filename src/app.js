const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const publichDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)
app.use(express.static(publichDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Anas'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anas'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'this page is for your help ',
        name: 'Anas'
    })
})

const publicAboutPath = path.join(__dirname, '../public/about.html')
app.use(express.static(publicAboutPath))

const publicHelpPath = path.join(__dirname, '../public/help.html')
app.use(express.static(publicHelpPath))


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'you must provide an address! '


        })

    }

})

app.get('/products', (req, res) => {
    if (!res.qurey.search) {
        return res.send({
            error: 'you must provide a search term'
        })

    }
    else {
        geocode(req.query.address, (error, { latitude, longitude, location }) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address

                })
            })


        })
    }


    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('error 404')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})


const request = require('request')


const forecast = (latitude, longitude , callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=8d43300d169c011eb4a977c128e14f1d&query=' + latitude + ',' + longitude + '&units=f'
    
    request ({ url: url, json: true}, (error, {body})=>{
       
        if(error){
          callback('Unable to connect to the forecast services ', undefined)
       }else if (body.error)
       {
          callback(undefined, 'Unable to find location ')
       }else{
          callback(undefined, body.current.temperature + ' Is is here ' + body.current.weather_descriptions + '% chance of rain.'         )
       }
    })
 }

 module.exports = forecast
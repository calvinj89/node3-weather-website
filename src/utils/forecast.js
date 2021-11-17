const request = require('request')

const forecast = (lat, long, callback) => {
   
    const url = "http://api.weatherstack.com/current?access_key=dd8ce3f6c91fdc24d745b9c76e08ddc5&query=" + lat + "," + long + "&units=f"
    
    request({ url, json: true}, (error, { body } ) => {
        console.log('Part 2: Lat '+ lat + ' ' + ' Long ' + long)
        if (error){
            console.log('Unable to connect to weather service')
        } else if (body.error) {
            console.log('Unable to find location')
        }  else {
            callback(undefined, { 
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                weatherDescription: body.current.weather_descriptions[0],
                region: body.location.region
            })
        }
    })

}

module.exports = forecast
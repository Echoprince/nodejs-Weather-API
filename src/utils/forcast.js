const request = require("request");


/**
 * Forcast Function
 */

const forcast = (lat, long, callback) => {

const forcastUrl = `http://api.weatherstack.com/current?access_key=b0c8ca689706352b7970282e188040a4&query=${lat},${long}&units=f`

    request({url: forcastUrl, json: true }, (error, {body} = {}) => {

    if(error){
        callback("Could not connect to API Server", undefined)
    }else if(body.error){
        callback("Could not find location, Please check input", undefined)
    }else{
        callback(undefined, {
            temperature: body.current.temperature,
            Weather_Description: body.current.weather_descriptions[0],
            Apparent_Weather: body.current.feelslike

        })
    }

})

}

module.exports = forcast


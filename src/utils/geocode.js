const request = require('request')

const geocode = (address , callback) => {

    const geaocodeurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidWNoZW5uYTEtIiwiYSI6ImNrcXAxbnAxbzBydnEyb3N0ZzRnNnJ0dWsifQ.Dk8SLthCkWceUNJexO4jhQ&limit=1`

    request({url: geaocodeurl, json: true}, (error, {body} = {}) => {

        if(error){
            callback("Could not reach API server", undefined)
        }else if(body.features.length === 0){
            callback("Invalid data input, try another search", undefined)
        }else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })

}

module.exports = geocode


const request = require(`request`)

const forecast = (lat,long,callback)=>{
    const weather = `http://api.weatherstack.com/current?access_key=d437924f58b6aec897b168efbfcd4594&query=${lat},${long}`;
    request({url:weather,json:true},(err,resp,body)=>{
        // console.log(resp.body);
        if(err){
            callback(`something is wrong with the connection`,undefined)
        }else if (resp.body.success===false){
            callback(resp.body.error.info,undefined)
        }else{
            console.log(resp.body);
            const location = resp.body.location
            const current = resp.body.current
            const outputDesc = `${current.weather_descriptions[0]} in ${location.name} ${location.region}. It's currently ${current.feelslike} celsius out. The humidity is ${current.humidity} local time now is ${location.localtime}`
            callback(undefined, outputDesc)
        }
    })
}

module.exports = forecast;
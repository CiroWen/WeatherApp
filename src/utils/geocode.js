const request = require(`request`)

const geocode = (location,callback)=>{
    const geo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiY2lyb3dlbiIsImEiOiJjazk1eTJ5bDcwN2toM2ZxZmlkNHV5Y3JkIn0.frqJYzReybGLjEqIzRS9qw&limit=1`;
    request({url:geo,json:true},(err,resp,body)=>{    
        if(err){
            callback(`something is wrong with the connection`,undefined)
        }else if (resp.body.features.length===0){
            callback(`unable to find the gien location`,undefined)
        }else{
            // console.log(resp.body);
            callback(undefined,{
                latitude:resp.body.features[0].center[1],
                longtitude:resp.body.features[0].center[0],
                location:resp.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
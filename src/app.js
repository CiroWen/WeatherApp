const express = require(`express`)
const app = express()
const port = 3000
const path = require(`path`)
const hbs = require(`hbs`)
const forecast = require(`./utils/forecast.js`)
const geo = require(`./utils/geocode.js`)


console.log(__dirname);
// console.log(__filename);
const viewsPath = path.join(__dirname,`../hbs`)
const relativePath = path.join(__dirname,`../public`)
const partialPath = path.join(__dirname,`../hbs/partials`)
//__dirname is pointing to the directory that app.js in
//../public two dots mean going one level up of the directory
//we may deploy the project, so we need to use the relative path instead of the path that only works on localhost(absolute path).

app.use(express.static(relativePath))
//setup static pages
hbs.registerPartials(partialPath)
//setup hbs partials templates
app.set(`view engine`,`hbs`)
//setup the engine for express
//guess: different library uses different syntax system. so express needs to know which library is being used to render the html.
app.set(`views`,viewsPath)
//setup views template directory

//**use of res.send here */
// app.get(`/`,(req,res)=>{
//     res.send(`<h1>Ciro Udemy Weather App</h1>`)
// })

app.get(`/weather`,(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:`you must provide an address to process`
        })
    }
    // const location = req.query.address
    geo(req.query.address,(err,{latitude,longtitude,location} = {})=>{
        // console.log(latitude,longtitude,location);

        forecast(latitude,longtitude,(err,forecastData)=>{
            res.send({
                forecast:forecastData,
                location,
                inputAddress:req.query.address
            })        
        })
    })

})
//**use of res.send here */


/**use of res.render here */
app.get('',(req,res)=>{
    res.render('index',{
        header:`index`,
        weather:'Sunny',
        location:`Vancouver`,
        author:`Ciro`,
        
    })
})

app.get(`/about`,(req,res)=>{
    res.render('about',{
        header:`about`,
        author:`Ciro`,
        contact:110
    })
})

app.get(`/help`,(req,res)=>{
    res.render(`help`,{
        header:`help`,
        contact:110,
        author:`Ciro`,
    })
})

app.get(`/help/*`,(req,res)=>{
    res.render(`404`,{
        errMsg:`Help article not found`,
    })
})

app.get(`*`,(req,res)=>{
    res.render(`404`,{
        header:`404`,
        errMsg:'Page not found',
        author:`Ciro`,
    })
})
/**use of res.render here */
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})

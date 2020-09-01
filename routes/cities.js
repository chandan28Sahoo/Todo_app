module.exports=((routes,knex)=>{
    // post cities
    routes
        .post('/city',(req,res)=>{
            var city=req.body
            knex('cities')
            .insert(city)
            .then((row)=>{
                res.send("secuessfully insert !")
            }).catch((err)=>{
                res.send(err)
            })
        })



    // get cities by city name
    routes
        .get('/city/:name',(req,res)=>{
            knex
            .select('*').from('cities')
            .where('name',req.params.name)
            .then((row)=>{
                res.send(row)
            }).catch(err=>{
                res.send(err)
            })
        })
})
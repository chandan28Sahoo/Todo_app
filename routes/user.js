module.exports=((routes,knex)=>{
    // get user details by id
    routes
        .get('/user/:id',(req,res)=>{
            knex
            .select('*')
            .from('users').where('user_id',[req.params.id])
            .then((row)=>{
                res.send(row)
            }).catch(err=>{
                res.send(err)
            })
        })

    // get user details by user id
    routes
        .get('/user/:user_id',(req,res)=>{
            knex
            .select('*')
            .from('users')
            .join('cities', function() {
                this.on('users.city_id ','=','cities.city_id')
            })
            .where('users.user_id',req.params.user_id)
            .then((data)=>{
                for(i of data){
                    var dict={
                        "id": i.user_id,
                        "name":i.Name,
                        "email":i.email,
                        "age":i.age,
                        "city": {
                            "name":i.name, 
                            "id":i.city_id,
                        }
                    }
                }
                res.send(dict)
            })
        })

    // get user by age and city name
    routes
        .get('/by_age/city_name',(req,res)=>{
            let more_then=req.query.more_then || 0;
            let less_then=req.query.less_then || 999;
            let city_name=req.query.city_name;
            knex
            .select('*')
            .from('users')
            .join('cities', function() {
                this.on('users.city_id ','=','cities.city_id')
            })
            .whereBetween('age', [more_then, less_then])
            .andWhere('cities.name','=',city_name )
            .then((row)=>{
                let list=[]
                for(i of row){
                    var dict={
                        "id": i.user_id,
                        "name":i.Name,
                        "email":i.email,
                        "age":i.age,
                        "city": {
                            "name":i.name,
                            "id":i.city_id,
                        }
                    }
                    list.push(dict)
                }
                res.send(list)
            }).catch(err=>{
                res.send(err)
            })
        })

// If `cityId` and `ageMoreThan` are given, then the users with age more than specified in `ageMoreThan` and the given `cityId` will be given.
//  Notice how these filters work like `AND`

    routes
        .get('/by_age/city_id',(req,res)=>{
            let more_then=req.query.more_then || 0;
            let less_then=req.query.less_then || 999;
            let city_id=req.query.city_id || 0;
            let user_id=req.query.user_id || 0;
            // console.log(more_then,less_then,city_id)
            knex
            .select('*')
            .from('users')
            .join('cities', function() {
                this.on('users.city_id ','=','cities.city_id')
            })
            .whereBetween('age', [more_then, less_then])
            // .andWhere('cities.city_id','=',city_id )
            .andWhere(function(){
                if(city_id!=0){
                    this.where("users.city_id",city_id)
                }else{
                    this.whereNotNull('users.city_id')
                }
            })
            .then((row)=>{
                // res.send(row)
                let list=[]
                for(i of row){
                    var dict={
                        "id": i.user_id,    
                        "name":i.Name,
                        "email":i.email,
                        "age":i.age,
                        "city": {
                            "name":i.name,
                            "id":i.city_id,
                        }
                    }
                    if(user_id!=0){
                        if(dict.id==user_id){
                            // console.log(user_id)
                            list.push(dict)
                        }
                    }else{
                        list.push(dict)
                    }
                }
                res.send(list)
            }).catch(err=>{
                res.send(err)
            })
        })

    // delete
    // routes
    //     .delete('/delete',(req,res)=>{
    //         knex('users')
    //         .where("email",'r@navgurukul.org')
    //         .del()
    //         .then(row=>{
    //             res.send("secuessfully delete")
    //         })
    //     })


})
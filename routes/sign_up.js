module.exports=((routes,knex,bcrypt)=>{
    // signup
    routes
        .post('/signup',function(req,res){
        var stu_data=req.body
        if(stu_data.password==stu_data.confirm_password){
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(stu_data.password, salt,(err, hash)=>{
                    if(err){
                        res.send(err)
                    }else{
                        knex.select('*').from('users')
                        .then(async row=>{
                            if (row.length==0){
                                await knex('users')
                                .insert({
                                    Name:stu_data.Name,
                                    email:stu_data.email,
                                    age:stu_data.age,
                                    city_id:stu_data.city_id,
                                    password:hash,
                                    confirm_password:hash
                                })
                                .then(async row=>{
                                    // console.log(bcrypt_pass,1)
                                    res.send('secuessfully sign up. !');
                                })
                            }else{     
                                // console.log(stu_data)  
                                knex('users').where({"email":req.body.email,"Name":req.body.Name})
                                .then(row=>{
                                    if (row.length==0){
                                        knex('users')
                                        .insert({
                                            Name:stu_data.Name,
                                            email:stu_data.email,
                                            age:stu_data.age,
                                            city_id:stu_data.city_id,
                                            password:hash,
                                            confirm_password:hash
                                        })
                                        .then(row=>{
                                            res.send("secuessfully sign up. !")
                                        }).catch(err=>{
                                            res.send(err);
                                        })
                                    }else{
                                        res.send("data is alredy existed") 
                                    }
                                }).catch(err=>{
                                    res.send(err);
                                })

                            }
                        }).catch(err=>{
                            res.send(err)
                        })
                    }
                });
            });
        }else{
            res.send("password not match !")
        }

    })
})
































































































    // {
        // "Name":"rahul sakhya",
        // "email":"rahul@134gmail.com",
        // "password":"njkfeuyu7jjfdsf2",
        // "age":21,
        // "confirm_password":"njkfeuyu7jjfdsf2"
    // }
    // {
        // "Name":"atul parwoal",
        // "email":"atul@134gmail.com",
        // "password":"atul23@p",
        // "age":21,
        // "confirm_password":"atul23@p"
    // }

    // {
    //     "Name":"Rishabh Verma",
    //     "email":"r@navgurukul.org",
    //     "age":24,
    //     "password":"merasecretpassword",
    //     "confirm_password":"merasecretpassword"
    // }

    // {
    //     "Name": "Kumar Nayak",
    //     "email": "nayak19@navgurukul.org",
    //     "age":22,
    //     "password":"merasecretkumar",
    //     "confirm_password":"merasecretkumar"
    // }
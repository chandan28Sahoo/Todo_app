module.exports=((routes,knex,bcrypt)=>{
        // login
        routes
        .post('/login',(req,res)=>{
            knex('users')
            .where("email",req.body.email)
            .then(data=>{
                if(data.length !== 0){
                    bcrypt.compare(req.body.password,data[0].password, function(err, isMatch) {
                        if (err) {
                            throw err;
                        } else if (!isMatch) {
                            res.send("Password doesn't match!");
                        } else {
                            res.send("secuessfully login !");
                        }
                    })
                }else{
                        res.send("invalid email ! Pls enter correct email")
                    }
            }).catch(err=>{
                res.send(err)
            })
        })

})
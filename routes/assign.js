module.exports=((routes,knex)=>{

    // post /todos
    routes
        .post('/value',(req,res)=>{
            knex('assign')
            .insert([req.body])
            .then(()=>{
                res.send("secuessfully insert !")
            }).catch(err=>{
                res.send(err)
            })
        })


    // get by user id
    // The user ID is given in `assignedTo` field. Think of this as a shared todo list.
    //  All these parameters are compulsory. 
    // Make sure you store the date as a date field in the DB because this will be used in different SQL queries. 
    // The format of `dueDate` would be `YYYY-MM-DD`.

    routes
        .get('/assign/:user_id',(req,res)=>{
            knex
            .select('*')
            .from('cities')
            .join('users', function(){
                this.on('cities.city_id','=','users.city_id ')
            })
            .join('assign', function(){
                this.on('users.user_id','=','assign.user_id')
            })
            .where('users.user_id',req.params.user_id)
            .then(async(data)=>{
                for(i of data){
                    let date = i.dueDate
                    let Date= date.toString().slice(0,10)
                    var dict={
                        "todo":{
                            "text":i.text,
                            "assignedTo":{
                                "id": i.user_id,
                                "name":i.Name,
                                "email":i.email,
                                "age":i.age,
                                "city": {
                                    "name":i.name, 
                                    "id":i.city_id,
                                }
                            },
                            "dueDate":Date
                        }
                    }
                }
                res.send(dict)
            }).catch(err=>{
                res.send(err)
            })
        })

    //`fromDueDate` - Both `fromDueDate` and `toDueDate` need to be specified.
    // Either both should be empty or both should be specified. 
    // If both are given then all the todos whose due date is more than or equal to `fromDueDate` to due date which is less than or equal to `toDueDate`.

    routes
        .get('/assign_user',(req,res)=>{
            let fromDueDate = req.query.fromDueDate || " " ;
            let toDueDate = req.query.toDueDate || " " ;
            knex
            .select('*')
            .from('cities')
            .join('users', function(){
                this.on('cities.city_id','=','users.city_id ')
            })
            .join('assign', function(){
                this.on('users.user_id','=','assign.user_id')
            })
            .andWhere(function(){
                if(fromDueDate!=" " && toDueDate!=" "){
                    this.whereBetween('dueDate',[fromDueDate,toDueDate])
                }else if(fromDueDate!=" "){
                    this.where('dueDate',fromDueDate)
                }else if(toDueDate!=" "){
                    this.where('dueDate',toDueDate)
                }else{
                    this.whereNotNull('dueDate')
                }
            })
            .then((data)=>{
                let list=[];
                for(i of data){
                    // console.log(data)
                    let date = i.dueDate
                    let Date= date.toString().slice(0,10)
                    var dict={
                        "todo":{
                            "text":i.text,
                            "assignedTo":{
                                "id": i.user_id,
                                "name":i.Name,
                                "email":i.email,
                                "age":i.age,
                                "city": {
                                    "name":i.name, 
                                    "id":i.city_id,
                                }
                            },
                            "dueDate":Date
                        }
                    }
                    list.push(dict)
                }
                res.send(list)
            }).catch(err=>{
                res.send(err)
            })
        })

    // `assignedTo` assign?id=1,2,3
    // `assignedTo` - Comma seperated IDs of the users who the todos are assigned to.
    //  If this parameter is not specified then todos from all users need to be shown.
    //  Otherwise only todos of the given user IDs need to be shown. 
    // If let's say `1,2,3` are given then only todos assigned to users with the IDs 1, 2 and 3 will be shown.

    routes
        .get('/assign_to',(req,res)=>{
            let id=req.query.id || " ";
            let id2=id.split(',');
            console.log(id,id2)
            knex
            .select('*')
            .from('cities')
            .join('users', function(){
                this.on('cities.city_id','=','users.city_id ')
            })
            .join('assign', function(){
                this.on('users.user_id','=','assign.user_id')
            })
            // .whereIn('assign.assignedTo',con)
            .andWhere(function(){
                if(id!=" "){
                    this.whereIn('assign.assignedTo',id2)
                }else{
                    this.whereNotNull('assign.assignedTo')
                }
            })
            .then((data)=>{
                let list=[];
                for(i of data){
                    let date = i.dueDate
                    let Date= date.toString().slice(0,10)
                    var dict={
                        "todo":{
                            "text":i.text,
                            "assignedTo":{
                                "id": i.user_id,
                                "name":i.Name,
                                "email":i.email,
                                "age":i.age,
                                "city": {
                                    "name":i.name, 
                                    "id":i.city_id,
                                }
                            },
                            "dueDate":Date
                        }
                    }
                    list.push(dict)
                }
                res.send(list)
            }).catch(err=>{
                res.send(err)
            })
        })


})



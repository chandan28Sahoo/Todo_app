const express=require('express')
const app = express();
const router=express.Router()
const knex=require('./knex')
const bcrypt=require("bcrypt");

app.use('/',router)
router.use(express.json())

app.get('/',(req,res)=>{
    res.send("home")
    console.log("connected")
})

// sign_up
router.use("/data",router)
require("./routes/sign_up")(router,knex,bcrypt);

// login
router.use("/data",router)
require("./routes/login")(router,knex,bcrypt);


// cities
router.use("/data",router)
require("./routes/cities")(router,knex);

// user
router.use("/data",router)
require("./routes/user")(router,knex);

// assign
router.use("/data",router)
require("./routes/assign")(router,knex);


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
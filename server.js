let Express = require('express')
let Router = require('./routes')  // required router here
let Mongoose = require('mongoose')
let BodyParser = require('body-parser')
let cors = require('cors')
let path = require('path')
const Port = process.env.PORT || 5000

let server = Express()
const dburl = "mongodb+srv://ashu_lekhi:ebgE7FmlEINZhx6I@cluster0.w5ixg.mongodb.net/tcsnodeapi?retryWrites=true&w=majority" // tcsnodeproject is dbname
// ur is of two parts addressof mongodb server+ databasename
Mongoose.connect(dburl, (err,client)=>{
    if(err){
        console.log("Error in connecting to database" , err)
    }
    else{
        console.log("Connected to Database")
    }
})

console.log("process arguments" ,  process.argv[2] , process.argv[3])

server.use(Express.static(path.resolve(__dirname,'assets')))
server.use(Express.static(path.resolve(__dirname,'frontend')))

server.use(cors())
server.use(BodyParser.json())
server.use('/api',Router)   // used router here

server.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/frontend/index.html')
})
server.listen(Port,()=>{
    console.log("Server is listening on", Port)
})

// Why it recommended not to use async and await 


//rendering view from nodejs 
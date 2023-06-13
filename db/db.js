const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/todo",{useNewUrlParser:true});

const db=mongoose.connection;

db.on("error",function(){
    console.log("mongo db not connected");
})
db.once("open",function(){
    console.log("successfully connected with mongo db");
})

module.exports=db;









const mongoose=require('mongoose');

const ListSchema=new mongoose.Schema({
    Id:{
        type:String,
        required:true,
        unique:true
    },
    Title:{
        type:String,
        required:true,
        unique:true
    },
    Description:{
        type:String,
        required:false
    },
    Completed:{
        type:Boolean,
        required:false
    }
})
const items=mongoose.model("items",ListSchema);
module.exports=items;
const express=require('express');
const bp=require('body-parser');
const app=express();

const userRoutes=require('./routes/routes');
const db=require('./db/db');

app.use(bp.json());
app.use(bp.urlencoded({extended:true}))

app.use('/todos',userRoutes);
app.listen(7500,()=>{
    console.log("server is running on 7000");
})

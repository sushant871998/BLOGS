const express= require('express');
const mongoose=require('mongoose');
const app=express();
const port=6000;


const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true });

app.listen(port,()=>{
    console.log(`Server is running at port:${port}`);
});

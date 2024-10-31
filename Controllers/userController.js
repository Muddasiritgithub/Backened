const User=require("../Models/user");

require("dotenv").config();

exports.product=(req,res)=>{
 const a=3;
    console.log(a)
}


exports.registerUser=(req,res)=>{

   res.send({message:"uploaded success"})
}

exports.userLogin=(req,res)=>{

res.status(200).send({Message:"Login user api called."})
}
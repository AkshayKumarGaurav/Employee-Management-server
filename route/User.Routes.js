const express = require("express");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
var jwt = require('jsonwebtoken');
const { UserModel } = require("../model/User.Model");

UserRouter.post("/register", async (req, res) => {
  let { email, first_name, last_name, password, salary, department } = req.body;
  let user = await UserModel.findOne({ email });
  console.log(user)
  if (user) {
    res.status(406).send({ msg: "user already exists" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.status(304).send({ msg: err });
      }
      let data = new UserModel({ email, first_name, last_name, password:hash, salary, department });
      await data.save();
    });


    res.status(201).send({ msg: "user registered successfully!!" });
  }
});

UserRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let data = await UserModel.findOne({ email });
 console.log(data);

  if (data) {
    bcrypt.compare(password, data.password, function (err, result) {
      let token = jwt.sign({ user_id: data.id }, process.env.secretKey);
      if (err) {
        
        res.status(404).send({ msg: err });
      }
      if (result) {
        res.status(200).send({ msg: "login sucessfull!!!!!!",token });
      } else {
        res.status(401).send({ msg: "wrong Credentials!!!" });
      }
    });
  } else {
    res.status(401).send({ msg: "please register!!" });
  }
});

UserRouter.get('/employees', async (req,res)=>{
    let data1 = [];
    const {department} = req.query
    if(department){
       
            const data = await UserModel.find({department:department});
            data1.push(...data1,data)
         
    }
    else{
        const data = await UserModel.find()
       data1.push(...data1,data)

     }
   
    
    // let obj = req.query
    
    res.status(200).send({'msg':data1})
 })
 
 UserRouter.patch('/update:id', async (req,res)=>{
    await UserModel.findByIdAndUpdate(req.params.id,req.query)
    res.status(200).send({'msg':"user updated"})
 })
 
 UserRouter.delete('/delete:id',async (req,res)=>{
    await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).send({"msg":"user deleted"})
 })

module.exports = {
  UserRouter,
};
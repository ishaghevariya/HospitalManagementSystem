require("dotenv").config();

const userModel = require("./models/product")
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

mongoose
.connect(
    process.env.MONGOURL
)
.then(() => console.log("mongo db connected"));

//get list of all users
app.get("/list",async(req,res) =>{
   const patientList = await userModel.find({},{patientId:true});
   if(patientList.length === 0){
       return res.json({data : "no users in HMS"});
   }
   return res.json({data :patientList});
});

//Register user
app.post("/registration",(req,res) => {
    const{newUser} = req.body;
    userModel.create(newUser);
    return res.json({data : "registered successfully"});
});

//Login User
app.post("/login",async(req,res)=>{
   const uname = req.body.username;
   const pass = req.body.password;
   const user = await userModel.findOne({username : uname,password:pass});

   if(user){
       return res.json({data:"Login sucessfull"});
   }
   return res.json({data:"wrong detalis"});
});

//update user
app.put("/user/updateUser/:pid",async(req,res) =>{
  const pid = req.params.pid
  const wei= req.body.weight;
  const ag = req.body.age;
  const updateUser = await userModel.findOneAndUpdate(
      {patientId:pid},
      {weight:wei},
      {age:ag},
      {new:true}
      );
      return res.json({data : "user updated sucessfully"});
});

//delete user
app.delete("/user/deleteuser/:pid",async(req,res) =>{
   const deleteuser= await userModel.findOneAndDelete({
       patientId:req.params.pid
   });
    return res.json({ data : "user deleted successfully"});
});

app.listen(port, () => {
    console.log('Server running on port 5000');
});


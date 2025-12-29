const express = require("express");
const app = express();


app.use("/test",(req,res)=>{
  res.send("hello htis si rausnandf")
}) 

app.use("/hello",(req,res)=>{
  res.send("hello ")
})

app.use("/",(req,res)=>{
  res.send("/ dewdew")
})
app.listen(3000, () => {
  console.log("server running on port 3000");
});





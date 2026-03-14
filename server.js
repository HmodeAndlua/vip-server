const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("VIP SERVER RUNNING");
});

let codes = {
  "VIP123": []
};

app.post("/verify", (req, res) => {

  const code = req.body.code;
  const device = req.body.device;

  if(!codes[code]){
    return res.json({status:"INVALID"});
  }

  if(codes[code].includes(device)){
    return res.json({status:"OK"});
  }

  if(codes[code].length >= 1){
    return res.json({status:"DEVICE_LIMIT"});
  }

  codes[code].push(device);

  return res.json({status:"OK"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", ()=>{
  console.log("Server started on " + PORT);
});

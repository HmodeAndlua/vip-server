const express = require("express");
const app = express();

app.use(express.json());

// للتأكد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("VIP SERVER RUNNING");
});

// الأكواد
let codes = {
  "VIP123": []
};

// التحقق من الكود
app.post("/verify", (req, res) => {

  console.log("VERIFY REQUEST:", req.body);

  const code = req.body.code;
  const device = req.body.device;

  if(!codes[code]){
    console.log("INVALID CODE:", code);
    return res.json({status:"INVALID"});
  }

  if(codes[code].includes(device)){
    console.log("ALREADY USED ON DEVICE:", device);
    return res.json({status:"OK"});
  }

  if(codes[code].length >= 1){
    console.log("DEVICE LIMIT:", device);
    return res.json({status:"DEVICE_LIMIT"});
  }

  codes[code].push(device);

  console.log("ACTIVATED:", code, device);

  return res.json({status:"OK"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});

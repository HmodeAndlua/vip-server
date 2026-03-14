const express = require("express");
const app = express();

app.use(express.json());

// اختبار السيرفر
app.get("/", (req, res) => {
  res.send("VIP SERVER RUNNING");
});

// الأكواد
let codes = {
  "VIP123": []
};

// تحقق GET (للتطبيق)
app.get("/verify", (req, res) => {

  const code = req.query.code;
  const device = req.query.device;

  console.log("VERIFY REQUEST:", code, device);

  if(!codes[code]){
    console.log("INVALID CODE:", code);
    return res.send("INVALID");
  }

  if(codes[code].includes(device)){
    console.log("ALREADY USED:", device);
    return res.send("OK");
  }

  if(codes[code].length >= 1){
    console.log("DEVICE LIMIT:", device);
    return res.send("DEVICE_LIMIT");
  }

  codes[code].push(device);

  console.log("ACTIVATED:", code, device);

  return res.send("OK");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});

const express = require("express");
const rootFile = require("./routes/root");

const app = express();

app.use("/api/v1/acc",rootFile);

app.listen(3000,()=>console.log("Server started successfully..."));
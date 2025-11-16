const express = require("express");
const rootFile = require("./routes/root");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000 || process.env.PORT

app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(`${process.env.DATABASE_URL}`);

app.use("/api/v1/acc",rootFile);

app.listen(PORT,()=>console.log(`Server started at port ${PORT} successfully...`));
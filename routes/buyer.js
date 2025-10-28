const express = require("express");

const router = express.Router();

router.get("/sigin",(req,res)=>{
    res.json("Hello from udemy");
})



module.exports = router;
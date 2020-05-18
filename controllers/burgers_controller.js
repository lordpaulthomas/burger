const router = require("express").Router();
const burger = require("../models/burger.js");

router.get("/", function(req, res){
  burger.all(function(bugerData){
    res.render("index", {burger_data: bugerData})
  })
})

module.exports = router;
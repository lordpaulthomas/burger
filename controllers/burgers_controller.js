const router = require("express").Router();
const burger = require("../models/burger.js");

router.get("/", function(req, res){
  burger.all(function(bugerData){
    res.render("index", {burger_data: bugerData})
  })
});

router.put("/:id", function(req, res){
  var condition = "id = " + req.params.id;
  burger.update({
    devoured: req.body.devoured
  },
  condition,
  function(result){
    if(result.changedRows === 0){
      return res.status(404).end();
    }
    res.status(200).end();
  })
})

module.exports = router;
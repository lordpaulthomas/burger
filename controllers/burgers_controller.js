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
});

router.post("/burgers", function(req, res){
  burger.create(["burger", "devoured"], [req.body.burger, req.body.devoured], function(result){
    res.json({ id: res.insertId });
  });
});

router.delete("/burgers/:id", function(req, res){
  let condition = "id = " + req.params.id;
  burger.delete(condition, function(result){
    if(result.affectedRows == 0){
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  })
})

module.exports = router;
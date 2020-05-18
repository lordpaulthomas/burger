var orm = require("./../config/orm.js");
var burger = {
  all: function(cb){
    orm.all(function(res){
      cb(res);
    });
  }
}

module.exports = burger;
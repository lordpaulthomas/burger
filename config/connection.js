var mysql = require("mysql");

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(err){
  if(err){
    console.log("error connecting: " + err.stack);
    return
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
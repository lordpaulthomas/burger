var mysql = require("mysql");
var fs = require("fs");

var connection;
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HOpeless96!",
    database: "burgers_db"
  });
}


connection.connect(function(err){
  if(err){
    console.log("error connecting: " + err.stack);
    return
  }
  console.log("connected as id " + connection.threadId);
});

fs.readFile('./backup.sql', 'utf-8', (err, data) => {
  if (err) throw err;

  const sqlCommands = data.split(';').map(command => command.trim()).filter(command => command);


  sqlCommands.forEach((sqlCommand) => {
    connection.query(sqlCommand, (err, results) => {
      if(err) throw err;
      console.log('SQL Command executed:', results);
    });
  });
});

module.exports = connection;
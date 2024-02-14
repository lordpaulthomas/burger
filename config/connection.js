var mysql = require("mysql");
var fs = require("fs");

var connection;

// Configure the database connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HOpeless96!",
    database: "burgers_db",
  });
}

// Connect to the database
connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as ID " + connection.threadId);

  // Check if the table exists before executing SQL commands
  checkIfTableExists();
});

// Function to check if the table exists
function checkIfTableExists() {
  connection.query("SHOW TABLES LIKE 'burgers'", function (err, results) {
    if (err) throw err;

    if (results.length === 0) {
      console.log("Table does not exist. Creating...");
      createTable();
    } else {
      console.log("Table 'burgers' already exists. Skipping creation.");
    }
  });
}

// Function to create the table using SQL commands from backup.sql
function createTable() {
  fs.readFile("./backup.sql", "utf-8", (err, data) => {
    if (err) throw err;

    const sqlCommands = data
      .split(";")
      .map((command) => command.trim())
      .filter((command) => command);

    sqlCommands.forEach((sqlCommand) => {
      connection.query(sqlCommand, (err, results) => {
        if (err) throw err;
        console.log("SQL Command executed:", results);
      });
    });
  });
}

// Export the database connection
module.exports = connection;

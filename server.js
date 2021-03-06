const express = require("express");
const orm = require("./config/orm.js")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/burgers_controller.js");

//  example of giving orm a callback
// orm.all(console.log);

app.use(routes);

app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`);
})
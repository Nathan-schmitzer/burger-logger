const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers/burgers_controller");
const PORT = process.env.PORT || 3000;

const app = express();

// This serves static content for the app from the "public" directory in the application.
app.use(express.static("public"));

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This sets handlebars!
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// importing the routes and giving the server access to them


app.use(routes);

// app listening logs the start of the server
app.listen(PORT, () => {
    console.log(`Server is live @ htpp://localhost:${PORT}`);
});
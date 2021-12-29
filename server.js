const express = require('express');
const morgan = require('morgan');
//const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();

//npm run dev

/*var corsOptions = {
  origin: "http://localhost:8081"
};*/

app.use(express.static("public"));
//app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require("./app/routes/user.routes.js")(app);
require("./app/routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
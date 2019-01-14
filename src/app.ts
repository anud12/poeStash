import * as bodyParser from "body-parser";
import express = require("express");

import cookieParser = require("cookie-parser");

const app: express.Application = express();
export default app;
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static("src/static"));
app.use(cookieParser());

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});

// app.set('views', path.join(__dirname, 'routes'));
var controllers = require('require-all')({
    dirname: __dirname + '/www',
    filter: ".*\\.js$",
    recursive: true
});
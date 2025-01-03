const express = require('express');
const path = require('path');

const mainRouter = require('./routes/index');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

app.use(express.urlencoded({extended: false}));
app.use(mainRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
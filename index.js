const express = require('express');
const path = require('path');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

app.use("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
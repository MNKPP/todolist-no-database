const express = require('express');
const mainRouter = express.Router();

const taskRouter = require('./task');

// The most specific router first
mainRouter.use(taskRouter);

mainRouter.get('/', (req, res) => {
    res.render('index');
})


module.exports = mainRouter;
const express = require('express');
const taskRouter = express.Router();

taskRouter.post('/add-task', (req, res) => {
    res.send('<h1>Add Task</h1>');
})

module.exports = taskRouter;
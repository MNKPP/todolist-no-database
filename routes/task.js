const express = require('express');
const path = require('path');
const fs = require('fs');

const taskRouter = express.Router();

taskRouter.post('/add-task', (req, res) => {
    const body = req.body;
    const jsonBodyParsed = JSON.stringify(body);
    const jsonFilePath = path.join(path.resolve(__dirname, "../"), "public", "data.json");


    if (!fs.existsSync(jsonFilePath)) {
        return res.sendStatus(400);
    }

    try {
        fs.appendFileSync(jsonFilePath, jsonBodyParsed);
        res.redirect('/');
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }

})

module.exports = taskRouter;
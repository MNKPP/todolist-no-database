const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const taskRouter = express.Router();

taskRouter.post('/add-task', async (req, res) => {
    const body = req.body;
    const jsonFilePath = path.join(path.resolve(__dirname, "../"), "public", "data.json");

    if (!body.task) {
        res.redirect('/')
    }

    try {
        const fileContent = await fs.readFile(jsonFilePath);

        const fileContentParsed = JSON.parse(fileContent);

        const newData = {
            id: fileContentParsed.tasks.length + 1,
            title: body.task
        }

        fileContentParsed.tasks.push(newData)

        await fs.writeFile(jsonFilePath, JSON.stringify(fileContentParsed, null, 4));
        res.redirect('/');
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }

})

module.exports = taskRouter;
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const taskRouter = express.Router();

const jsonFilePath = path.join(path.resolve(__dirname, "../"), "public", "data.json");

taskRouter.post('/add-task', async (req, res) => {
    const body = req.body;

    if (!body.task) {
        res.redirect('/')
    }

    try {
        const fileContent = await fs.readFile(jsonFilePath);
        const fileContentParsed = JSON.parse(fileContent);

        const newData = {
            id: fileContentParsed.length + 1,
            title: body.task
        }

        fileContentParsed.push(newData)

        await fs.writeFile(jsonFilePath, JSON.stringify(fileContentParsed, null, 4));

        return res.redirect('/')

    } catch (err) {
        return res.status(400).send(err);
    }

})

taskRouter.delete('/delete-task/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
        const fileContent = await fs.readFile(jsonFilePath);
        const fileContentParsed = JSON.parse(fileContent);

        const filteredTasks = fileContentParsed.filter(item => item.id !== id);

        await fs.writeFile(jsonFilePath, JSON.stringify(filteredTasks, null, 4));

        return res.status(200).send(
            {
                message: 'Task deleted successfully'
            }
        )

    } catch (err) {
        return res.status(400).send(err);
    }
})
module.exports = taskRouter;
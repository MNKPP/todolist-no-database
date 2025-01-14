const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const mainRouter = express.Router();

const taskRouter = require('./task');

mainRouter.use(taskRouter);

mainRouter.get('/', async (req, res) => {
    const jsonFilePath = path.join(path.resolve(__dirname, "../"), "public", "data.json");

    const fileContent = await fs.readFile(jsonFilePath);

    const fileContentParsed = JSON.parse(fileContent);

    res.render('index', {data: fileContentParsed});
})


module.exports = mainRouter;
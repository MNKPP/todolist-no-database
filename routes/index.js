const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const mainRouter = express.Router();

const taskRouter = require('./task');

// The most specific router first
mainRouter.use(taskRouter);

mainRouter.get('/', async (req, res) => {
    // Read the task in a html list
    const jsonFilePath = path.join(path.resolve(__dirname, "../"), "public", "data.json");

    const fileContent = await fs.readFile(jsonFilePath);

    const fileContentParsed = JSON.parse(fileContent);

    // Bien connaître l'objet pour itérer correctment. Procèder par étape
    // Prochaine étape, savoir réaliser la boucle dans l'affichage des tâches
    fileContentParsed.tasks.forEach(task => {
        console.log(task.title)
    })
    res.render('index', {data: fileContentParsed.tasks});
})


module.exports = mainRouter;
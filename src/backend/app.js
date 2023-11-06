const express = require("express");

const app = express();
const port = 8000;

//La route de base, ici pour tester le fonctionnement du serveur
app.get("/", (request, response) => {
    response.json({ info: "Bien connecté au serveur" });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
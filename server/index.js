const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app
    .use(express.static(path.join(__dirname, '/../build')))
    .listen(PORT, () => console.log('Listening on ${port}'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});
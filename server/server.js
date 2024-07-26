const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({origin: "*"}));

let dataFilePath = './data.json'; // Path to the JSON file

// Method to save data
app.post('/save_best', (req, res) => {
    const data = req.body;
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to save data.');
        }
        res.send('Data saved successfully.');
    });
});

// Method to retrieve data
app.get('/get_best', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to retrieve data.');
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

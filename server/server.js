const express = require('express');
const { exec } = require('child_process');
const cors = require("cors");

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

app.post('/execute-script', (req, res) => {
  const scriptPath = req.body.scriptPath;
  exec("C:/Users/pfkik/OneDrive/Bureau/nicolas/flappy_bird/server/move_file.bat", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(error.message);
    }
    //res.send(stdout);
    console.log(stdout);
    return res.status(200).send("presque");
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

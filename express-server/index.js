const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

const port = 8080;
const dataPath = path.join(__dirname, 'data');

app.use(helmet());
app.use(cors({origin: true}));
app.use('/data', express.static(dataPath));

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/hello', (req, res) => {
  res.send({result: req.query['message']});
});

app.get('/fileNames', (_, res) => {
  let fileNames = [];
  try {
    fileNames = fs.readdirSync(dataPath);
  } finally {
    fileNames = fileNames.length
      ? fileNames.map(name => name.replace(/\.[^/.]+$/, ""))
      : ['gamine', 'hookfish'];
    res.send({fileNames});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

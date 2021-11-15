const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(helmet());
app.use(cors({origin: true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/hello', (req, res) => {
  res.send({result: req.query['message']});
});

app.get('/fileNames', (_, res) => {
  res.send({fileNames: ['gamine', 'hookfish']});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

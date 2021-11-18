const papa = require('papaparse');
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

app.get('/employeeData', (req, res) => {
  let fileName = req.query['dataSet'];
  fs.readFile(`${dataPath}/${fileName}.csv`, 'utf8', (err, file) => {
    if (err) console.log(err);
    else {
      let parsedData = papa.parse(file, {header: true}).data;
      parsedData = parsedData.map(({bonus, salary, city, department, employmentType, level}) => {
        return {
          compensation: parseInt(bonus) + parseInt(salary),
          city,
          department,
          employmentType,
          level
        }
      })
      res.send({data: parsedData});
    }
  });
});

app.get('/averageGivenFilters', (req, res) => {
  let filters = req.query['filters'].split(',');
  fs.fileRead(`${dataPath}/processedDataPath`, '', (err, data) => {
    data.map(({})).then(d => {
      let s = d.reduce((sum, val) => sum += val, 0);
      res.send({average: s/d.length})
    })
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import papa from 'papaparse';
import store from './ReduxStore';

const DataActions = {
  csvFileNames: () => ['gamine', 'hookfish'],
  parseCSVs: async () => {
    let csvFileNames = DataActions.csvFileNames();
    csvFileNames.forEach(async fileName => {
      await fetch(`./data/${fileName}.csv`)
        .then(file => file.text())
        .then(csvData => papa.parse(csvData, {header: true}))
        .then(parsedData => {
          store.dispatch({type: 'MERGE_ARRAY', path: ['employeeData'], value: parsedData.data});
          store.dispatch({type: 'SET', path: [`${fileName}Data`], value: parsedData.data});
        })
        .catch(err => console.log(err));
    });
  },


};

export default DataActions;

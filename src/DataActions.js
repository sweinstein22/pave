// import papa from 'papaparse';
import store from './ReduxStore';
import ServerAPI from './ServerAPI';
import {mapEmploymentType, safeObjectAppendToArray} from './Helpers';

const DataActions = {
  csvFileNames: async () => {
    let fileNames = ['gamine', 'hookfish'];
    // const {fileNames} = await ServerAPI.getFromServer({key: 'fileNames'})
    store.dispatch({type: 'SET', path: 'csvFileNames', value: fileNames});
    return fileNames;
  },
  dataSetNames: () => {
    let {csvFileNames} = store.getState();
    return ['employeeData', ...csvFileNames.map(n => `${n}Data`)]
  },

  parseCSVs: async () => {
    // let csvFileNames = await DataActions.csvFileNames();
    let csvFileNames = ['gamine', 'hookfish'];
    for (const fileName of csvFileNames) {
      await ServerAPI.getFromServer({key: 'employeeData', query: {dataSet: fileName}})
        .then(parsedData => {
          console.log(parsedData);
          store.dispatch({type: 'MERGE_ARRAY', path: ['employeeData'], value: parsedData.data});
          store.dispatch({type: 'SET', path: [`${fileName}Data`], value: parsedData.data});
        })
        .catch(err => console.log(err));
    };
  },

  sortAllData: () => {
    DataActions.dataSetNames().forEach(dataSetName => {
      DataActions.sortByTotalCompensation({dataSetName});
      DataActions.splitByDistinguishingFactors({dataSetName});
      DataActions.calculateAverages({dataSetName});
    });
  },

  sortByTotalCompensation: ({dataSetName}) => {
    let state = store.getState();
    let dataSet = state[dataSetName];
    const sortedTotalCompData = dataSet.sort(
      ({compensation: compensationA}, {compensation: compensationB}) => {
        // let employeeATotalComp = parseInt(salaryA) + parseInt(bonusA);
        // let employeeBTotalComp = parseInt(salaryB) + parseInt(bonusB);
        return compensationA > compensationB ? 1 : -1;
      });
    store.dispatch({type: 'SET', path: [`${dataSetName}SortedByCompensation`], value: sortedTotalCompData})
  },

  splitByDistinguishingFactors: ({dataSetName}) => {
    let state = store.getState();
    let dataSet = state[`${dataSetName}SortedByCompensation`] || [];

    let levels = [];
    let cities = [];
    let departments = [];
    let employmentTypes = [];

    let allComps = {};

    dataSet.forEach(({city, department, employmentType, level, compensation}) => {
      employmentType = mapEmploymentType(employmentType);

      levels = [...levels, level];
      cities = [...cities, city];
      departments = [...departments, department];
      employmentTypes = [...employmentTypes, employmentType]

      const employeeCompensation = compensation;

      safeObjectAppendToArray(allComps, `${level}`, employeeCompensation)

      safeObjectAppendToArray(allComps, `${department}.${city}.${employmentType}.${level}`, employeeCompensation)
      safeObjectAppendToArray(allComps, `${department}.${employmentType}.${level}`, employeeCompensation)
      safeObjectAppendToArray(allComps, `${department}.${level}`, employeeCompensation)
      safeObjectAppendToArray(allComps, `${department}.${city}.${level}`, employeeCompensation)

      safeObjectAppendToArray(allComps, `${city}.${employmentType}.${level}`, employeeCompensation)
      safeObjectAppendToArray(allComps, `${city}.${level}`, employeeCompensation)

      safeObjectAppendToArray(allComps, `${employmentType}.${level}`, employeeCompensation)
    });

    store.dispatch({type: 'SET', path: [`${dataSetName}Levels`], value: [...new Set(levels)].sort()});
    store.dispatch({type: 'SET', path: [`${dataSetName}Cities`], value: [...new Set(cities)].sort()});
    store.dispatch({type: 'SET', path: [`${dataSetName}Departments`], value: [...new Set(departments)].sort()});
    store.dispatch({type: 'SET', path: [`${dataSetName}EmploymentTypes`], value: [...new Set(employmentTypes)].sort()});

    store.dispatch({type: 'SET', path: [`${dataSetName}SortedComps`], value: allComps});
  },

  calculateAverages: ({dataSetName}) => {
    let state = store.getState();
    let dataSet = state[`${dataSetName}SortedComps`] || [];
    let averageComps = {};
    Object.keys(dataSet).forEach(key => {
      let dataAtKey = dataSet[key];
      averageComps[key] = DataActions.average({data: dataAtKey});
    });

    store.dispatch({type: 'SET', path: [`${dataSetName}AverageComps`], value: averageComps});
  },

  average: ({data}) => {
    if (Array.isArray(data)) {
      let sum = data.reduce((s, val) => s + val, 0);
      return (sum / data.length).toFixed(2);
    } else {
      return Object.keys(data).reduce((memo, k) => {
        memo[k] = DataActions.average({data: data[k], key: k});
        return memo;
      }, {});
    };
  }
};

export default DataActions;

import papa from 'papaparse';
import store from './ReduxStore';
import {mapEmploymentType, safeObjectAppendToArray} from './Helpers';

const DataActions = {
  csvFileNames: () => ['gamine', 'hookfish'],
  dataSetNames: () => ['employeeData', ...DataActions.csvFileNames().map(n => `${n}Data`)],

  parseCSVs: async () => {
    let csvFileNames = DataActions.csvFileNames();
    for (const fileName of csvFileNames) {
      await fetch(`./data/${fileName}.csv`)
        .then(file => file.text())
        .then(csvData => papa.parse(csvData, {header: true}))
        .then(parsedData => {
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
    });
  },

  sortByTotalCompensation: ({dataSetName}) => {
    let state = store.getState();
    let dataSet = state[dataSetName];
    const sortedTotalCompData = dataSet.sort(
      ({salary: salaryA, bonus: bonusA}, {salary: salaryB, bonus: bonusB}) => {
        let employeeATotalComp = parseInt(salaryA) + parseInt(bonusA);
        let employeeBTotalComp = parseInt(salaryB) + parseInt(bonusB);
        return employeeATotalComp > employeeBTotalComp ? 1 : -1;
      });
    store.dispatch({type: 'SET', path: [`${dataSetName}SortedByCompensation`], value: sortedTotalCompData})
  },

  splitByDistinguishingFactors: ({dataSetName}) => {
    let state = store.getState();
    let dataSet = state[`${dataSetName}SortedByCompensation`] || [];

    let cities = [];
    let departments = [];
    let employmentTypes = [];

    let departmentComps = {};

    dataSet.forEach(({city, department, employmentType, gender, level, salary, bonus}) => {
      employmentType = mapEmploymentType(employmentType);

      cities = [...cities, city];
      departments = [...departments, department];
      employmentTypes = [...employmentTypes, employmentType]

      const employeeCompensation = parseInt(bonus) + parseInt(salary);

      safeObjectAppendToArray(departmentComps, `${department}.${level}`, employeeCompensation)
      safeObjectAppendToArray(departmentComps, `${department}.${city}.${level}`, employeeCompensation)
      safeObjectAppendToArray(departmentComps, `${department}.${city}.${employmentType}.${level}`, employeeCompensation)

      safeObjectAppendToArray(departmentComps, `${department}.${employmentType}.${level}`, employeeCompensation)

    });

    store.dispatch({type: 'SET', path: [`${dataSetName}Cities`], value: [...new Set(cities)]});
    store.dispatch({type: 'SET', path: [`${dataSetName}Departments`], value: [...new Set(departments)]});
    store.dispatch({type: 'SET', path: [`${dataSetName}EmploymentTypes`], value: [...new Set(employmentTypes)]});

    store.dispatch({type: 'SET', path: [`${dataSetName}SortedDepartmentComps`], value: departmentComps});
  }
};

export default DataActions;

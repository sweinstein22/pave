import React from 'react';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {safeArrayInsertAtLevel, safeObjectGet} from './Helpers';

class Graphs extends React.Component {
  render() {
    let {
      currentDepartment,
      currentEmploymentType,
      currentCity,
      dataSet,
      levels
    } = this.props;

    const options = {plugins: {legend: {display: false}}};
    const compDataPath = [currentDepartment, currentCity, currentEmploymentType].filter(i => i).join('.');

    let sets = [];
    let compsForSelection = safeObjectGet(dataSet, compDataPath);
    if (!compsForSelection) return null;

    levels.forEach(level => {
      compsForSelection[level].forEach((salary, index) => {
        safeArrayInsertAtLevel({arr: sets, index, level, val: salary});
      })
    });
    const data = {
      labels: levels.map(level => `Level ${level}`),
      datasets:
        sets.map((data = [0, 0, 0, 0, 0], index) => {
          return {
            data,
            label: 'Total Compensation',
            backgroundColor: `rgb(${index}0, 1${index}0, 1${index}0)`,
            stack: `Stack ${index}`,
          }
        })
    };
    return (
      <Bar {...{data, options, redraw: true}} />
    );
  }
};

const mapStateToProps = (reduxStore => {
  let {
    currentDataSetName,
    currentDepartment,
    currentEmploymentType,
    levels
  } = reduxStore;
  return {
    currentDepartment,
    currentEmploymentType,
    dataSet: reduxStore[`${currentDataSetName}SortedDepartmentComps`],
    levels
  }
});

export default connect(mapStateToProps)(Graphs);

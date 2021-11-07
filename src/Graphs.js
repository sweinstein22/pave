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

    const options = {
      scales: {
        x: {
          grid: {color: '#7a7a7a'}, ticks: {color: '#bababa'},
          title: {text: 'Employee Compensation by Level', display: true, color: 'white'}
        },
        y: {
          grid: {color: '#7a7a7a'}, ticks: {color: '#bababa'},
          title: {text: 'Total Compensation (Salary + Bonus)', display: true, color: 'white'}
        },
      },
      plugins: {legend: {display: false}}
    };
    const compDataPath = [currentDepartment, currentCity, currentEmploymentType].filter(i => i).join('.');

    let sets = [];
    let compsForSelection = compDataPath.length ? safeObjectGet(dataSet, compDataPath) : dataSet;
    if (!compsForSelection) return null;

    levels.forEach(level => {
      compsForSelection[level].forEach((salary, index) => {
        safeArrayInsertAtLevel({arr: sets, index, level, val: salary});
      })
    });
    const data = {
      labels: levels.map(level => `Level ${level}`),
      datasets:
        sets.map((data, index) => {
          return {
            data,
            label: 'Total Compensation',
            backgroundColor: `rgb(${index % 10}0, 1${index % 10}0, 1${index % 10}0)`,
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
    dataSet: reduxStore[`${currentDataSetName}SortedComps`],
    levels
  }
});

export default connect(mapStateToProps)(Graphs);

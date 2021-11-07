import React from 'react';
import {connect} from 'react-redux';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import store from './ReduxStore';
import DataActions from './DataActions';

class SelectionForm extends React.Component {
  handleChange = ({event, field}) => {
    event.preventDefault();
    store.dispatch({type: 'SET', path: [field], value: event.target.value})
    if (field === 'currentDataSetName') {
      store.dispatch({type: 'RESET_PATH'})
    }
  };

  render() {
    const {
      currentDataSetName, currentDepartment, currentEmploymentType, currentCity,
      departments, employmentTypes, cities
    } = this.props;
    const dataSetNames = DataActions.dataSetNames();

    return (
      <form className="selection-form">
        <FormControl className="form-control">
          <InputLabel id="data-set-select-label">Data Set</InputLabel>
          <Select
            labelId="data-set-select-label"
            id="data-set-select"
            value={currentDataSetName}
            label="Data Set"
            onChange={event => this.handleChange({event, field: 'currentDataSetName'})}
          >
            {dataSetNames.map(name =>
              <MenuItem value={name} key={name}>{name}</MenuItem>
            )}
          </Select>
        </FormControl>
        {currentDataSetName && <FormControl className="form-control">
          <InputLabel id="department-select-label">Department</InputLabel>
          <Select
            labelId="department-select-label"
            id="department-select"
            value={currentDepartment}
            label="Department"
            onChange={event => this.handleChange({event, field: 'currentDepartment'})}
          >
            {departments.map(name =>
              <MenuItem value={name} key={name}>{name}</MenuItem>
            )}
          </Select>
        </FormControl>}
        {currentDataSetName && currentDepartment && <FormControl className="form-control">
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={currentCity}
            label="City"
            onChange={event => this.handleChange({event, field: 'currentCity'})}
          >
            <MenuItem value="" key="All">All Cities</MenuItem>
            {cities.map(name =>
              <MenuItem value={name} key={name}>{name}</MenuItem>
            )}
          </Select>
        </FormControl>}
        {currentDataSetName && currentDepartment && <FormControl className="form-control">
          <InputLabel id="employment-type-select-label">Employment Type</InputLabel>
          <Select
            labelId="employment-type-select-label"
            id="employment-type-select"
            value={currentEmploymentType}
            label="Employment Type"
            onChange={event => this.handleChange({event, field: 'currentEmploymentType'})}
          >
            <MenuItem value="" key="All">All Employment Types</MenuItem>
            {employmentTypes.map(name =>
              <MenuItem value={name} key={name}>{name}</MenuItem>
            )}
          </Select>
        </FormControl>}
      </form>
    )
  };
};

const mapStateToProps = (reduxStore => {
  let {
    currentDataSetName,
    currentDepartment,
    currentEmploymentType,
    currentCity
  } = reduxStore;
  return {
    currentDataSetName,
    currentDepartment,
    currentEmploymentType,
    currentCity,
    departments: reduxStore[`${currentDataSetName}Departments`] || [],
    employmentTypes: reduxStore[`${currentDataSetName}EmploymentTypes`] || [],
    cities: reduxStore[`${currentDataSetName}Cities`] || []
  }
});

export default connect(mapStateToProps)(SelectionForm);

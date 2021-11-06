import {createStore} from 'redux';
import DataActions from './DataActions';
import _ from 'lodash';

const reducerFunc = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'SET':
      newState = _.cloneDeep(state);
      newState[action.path] = action.value;
      return newState;
    case 'MERGE_ARRAY':
      newState = _.cloneDeep(state);
      newState[action.path] = [...newState[action.path], ...action.value];
      return newState;
    case 'RESET':
      return {...initialState};
    default:
      return {...state};
  }
};

const initialState = {
  employeeData: []
};

export class ReduxStore {
  constructor(createStoreFunc = createStore) {
    this.store = createStoreFunc(reducerFunc, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    DataActions.parseCSVs();
  };

  resetStore() {
    this.store.dispatch({type: 'RESET'});
    return this.store.getState();
  };

  getStore() {
    return this.store;
  };

  getState() {
    return this.store.getState();
  };

  dispatch(action) {
    this.store.dispatch(action);
  };
}

export default new ReduxStore();

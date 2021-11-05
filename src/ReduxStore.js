import {createStore} from 'redux';
import _ from 'lodash';

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      let newState = _.cloneDeep(state);
      newState[action.path] = action.value;
      return newState;
    case 'RESET':
      return {...initialState};
    default:
      return {...state};
  }
};

const initialState = {

};

export class ReduxStore {
  constructor(createStoreFunc = createStore) {
    this.store = createStoreFunc(reducerFunc, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
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

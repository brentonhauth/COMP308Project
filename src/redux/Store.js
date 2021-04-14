import { createStore } from 'redux';
import reducers from './Reducers';

const Store = createStore(reducers);
export default Store;
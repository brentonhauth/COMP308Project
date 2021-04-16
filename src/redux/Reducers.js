import ActionTypes from './ActionTypes';
import _cloneDeep from 'lodash.clonedeep';

const INITIAL = {
  token: null,
  me: null,
  myGroups: [],
  myChallenges: []
};

const Reducers = {
  [ActionTypes.LOGIN]: (state, payload) => {
    return { ...state, ...payload };
  },

  [ActionTypes.LOGOUT]: (state, payload) => {
    return { ...state, ...payload };
  },

  [ActionTypes.RESET]: (_state, _payload) => {
    return _cloneDeep(INITIAL);
  },

  [ActionTypes.REFRESH]: (state, _payload) => {
    return state;
  },
};



export default function fn(state, { type, payload }={}) {
  if (!state) {
    state = _cloneDeep(INITIAL);
  }
  if (typeof Reducers[type] === 'function') {
    return Reducers[type](state, payload);
  } else {
    console.warn(`type (${type}) not mapped`);
    return state;
  }
}

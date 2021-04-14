import ActionTypes from './ActionTypes';

const INITIAL = {
  token: null,
  me: null,
  myGroups: null,
};

const Reducers = {
  [ActionTypes.LOGIN]: (state, payload) => {
    return { ...state, ...payload };
  }
};



export default function fn(state=INITIAL, { type, payload }={}) {
  if (typeof Reducers[type] === 'function') {
    return Reducers[type](state, payload);
  } else {
    console.warn(`type (${type}) not mapped`);
    return state;
  }
}

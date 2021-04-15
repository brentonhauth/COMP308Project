import ActionTypes from './ActionTypes';

/**
 * @typedef ActionObject
 * @property {ActionTypes} type
 * @property {any} payload
 */

/** @returns {ActionObject} */
export const login = (me, token) => ({
  type: ActionTypes.LOGIN,
  payload: { me, token }
});


/** @returns {ActionObject} */
export const logout = () => ({
  type: ActionTypes.LOGOUT,
  payload: {
    me: null,
    token: null,
  }
});

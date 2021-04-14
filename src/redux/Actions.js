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

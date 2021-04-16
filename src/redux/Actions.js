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

/** @returns {ActionObject} */
export const refresh = () => ({
  type: ActionTypes.REFRESH,
  payload: null,
});

/** @returns {ActionObject} */
export const reset = () => ({
  type: ActionTypes.RESET,
  payload: null,
});

/** @returns {ActionObject} */
export const joinGroup = (group) => ({
  type: ActionTypes.JOIN_GROUP,
  payload: group
});
/** @returns {ActionObject} */
export const leaveGroup = (group) => ({
  type: ActionTypes.LEAVE_GROUP,
  payload: group
});

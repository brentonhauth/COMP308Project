import axios from 'axios';
import _get from 'lodash.get';
import config from '../config';

/**
 * @template T
 * @typedef ResponseData
 * @property {{code: number, msg: string}} meta
 * @property {T} data
 */

/** @type {Record<string, string>} */
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' // 'x-www-form-urlencoded'
};

const instance = axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
});


async function send(method, url, data) {
  const res = await instance({ url, method, headers, data });
  const code = _get(res, 'data.meta.code', 200);
  if (res.status === 200 && code === 200) {
    return _get(res, 'data.data', res.data) || {};
  }
  const msg = _get(res, 'data.meta.msg') || res.statusText;
  throw new Error(msg);
}


export default {

  /**
   * @param {string} name
   * @param {string} [value]
   */
  header(name, value) {
    if (value !== undefined) {
      headers[name] = value;
    }
    return headers[name];
  },

  /**
   * @param {string} url
   */
  get: url => send("GET", url),

  /**
   * @param {string} url
   * @param {*} body
   */
  post: (url, body) => send("POST", url, body),

  /**
   * @param {string} url
   * @param {*} body
   */
  put: (url, body) => send("PUT", url, body)
};
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
  params: { web: true }
});


async function send(method, url, data, more={}) {
  const res = await instance({ url, method, headers, data, ...more });
  const code = _get(res, 'data.meta.code', 200);
  if (res.status === 200 && code === 200) {
    return _get(res, 'data.data', res.data) || {};
  }
  const msg = _get(res, 'data.meta.msg') || res.statusText;
  throw new Error(msg);
}


const Request = {

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

  authorization(value) {
    value = typeof value === 'string' ? `Bearer\x20${value}` : null;
    return Request.header('Authorization', value);
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
  put: (url, body) => send("PUT", url, body),

  send,
};

export default Request;

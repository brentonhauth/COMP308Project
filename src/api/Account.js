import Request from '../helpers/Request';
import config from '../config/config';

export async function login(body) {
  console.log(body);
  const res = await Request.post('/account/login', body);
  // owo
  return res.data;
}

export async function signup(data) {
  const res = await Request.post('/account/signup', data);
  // ...
  return res.data;
}

export async function logout() {
  const res = await Request.get('/account/logout');
  return res.data;
}

export async function touch() {
  const res = await Request.get('/account/touch');
  return res.data;
}

import Request from '../helpers/Request';

export async function login(body) {
  console.log(body);
  const res = await Request.post('/account/login', body);
  return res;
}

export async function signup(data) {
  const res = await Request.post('/account/signup', data);
  return res;
}

export async function logout() {
  const res = await Request.get('/account/logout');
  return res;
}

export async function touch() {
  const res = await Request.get('/account/touch');
  return res;
}

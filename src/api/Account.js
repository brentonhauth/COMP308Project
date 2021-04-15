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
  // const res = await Request.get('/account/touch');
  const res = await Request.send('GET', '/account/touch', null, {
    withCredentials: true
  });
  return res;
}

export async function getQuestions(email) {
  const res = await Request.get(`/account/questions?email=${email}`);
  return res;
}

export async function answerQuestions(data) {
  const res = await Request.post('/account/questions', data);
  return res;
}

export async function passreset({ password, token }={}) {
  Request.authorization(token);
  try {
    const res = await Request.post('/account/passreset', { password });
    Request.authorization(null);
    return res;
  } catch (e) {
    Request.authorization(null);
    throw e;
  }
}

import Request from '../helpers/Request';

export async function getAllChallenges() {
  const res = await Request.get('/cusrep/challenges');
  return res;
}

export async function getChallenge(cid) {
  return Request.get(`/cusrep/challenge/${cid}`);
}

export async function createChallenge(data) {
  return Request.post('/cusrep/challenge/create', data);
}

export async function updateChallenge(cid, data) {
  return Request.post(`/cusrep/challenge/${cid}`, data);
}

export async function getAllRewards() {
  const res = await Request.get('/cusrep/rewards');
  return res;
}
export async function getReward(cid) {
  return Request.get(`/cusrep/reward/${cid}`);
}
export async function createReward(data) {
  return Request.post('/cusrep/reward/create', data);
}
export async function updateReward(cid, data) {
  return Request.post(`/cusrep/reward/${cid}`, data);
}

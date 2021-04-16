import Request from '../helpers/Request';

export async function getAvailableChallenges() {
  const res = await Request.get('/challenge/available');
  return res;
}

export async function getMyChallenges() {
  const res = await Request.get('/challenge/active');
  return res;
}

export async function participateInChallenge(challengeId) {
  const res = await Request.get(`/challenge/participate/${challengeId}`);
  return res;
}

export async function getChallenge(challengeId) {
  const res = await Request.get(`/challenge/${challengeId}`);
  return res;
}

export async function getChallengeProgress(challengeId) {
  const res = await Request.get(`/challenge/progress/${challengeId}`);
  return res;
}

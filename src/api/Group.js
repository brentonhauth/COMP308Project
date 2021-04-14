import Request from '../helpers/Request';
const EMPTY_JSON =  {};

/**
 * @param {string} groupId
 */
export async function getGroup(groupId) {
  const res = await Request.get(`/group/${groupId}`);
  return res;
}

/**
 * @param {{name:string}} param0
 */
export async function createGroup({ name }={}) {
  // todo: add validation
  const res = await Request.post('/group/create', { name });
  return res;
}

export async function getMyGroups() {
  const res = await Request.get('/group/mine');
  return res;
}

/**
 * @param {string} groupId
 */
export async function joinGroup(groupId) {
  const res = await Request.put(`/group/join/${groupId}`, EMPTY_JSON);
  return res;
}

/**
 * @param {string} groupId
 */
export async function leaveGroup(groupId) {
  const res = await Request.put(`/group/leave/${groupId}`, EMPTY_JSON);
  return res;
}

/**
 * @param {string} groupId
 * @param {string} memberId
 */
export async function removeGroupMember(groupId, memberId) {
  const body = { member: memberId };
  const res = await Request.post(`/group/${groupId}/remove`, body);
  return res;
}

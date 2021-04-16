import Request from '../helpers/Request';
export async function searchUser(body) {
    console.log(body);
    const res = await Request.post('/admin/search', body);
    return res;

  }
export async function updateUser(userId, body)
{
    console.log(body);
    const res = await Request.post('/admin/user/' + userId, body);
    return res;
}
export async function searchUserById(userId,body) {
  const res = await Request.get('/admin/user/' + userId, body);
  console.log('Res: ' + res);
  return res;

}
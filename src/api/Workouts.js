import Request from '../helpers/Request';

export async function RecommendedWorkouts(body) {
  console.log(body);
  const res = await Request.get('/workout/recommended');
  return res;
}
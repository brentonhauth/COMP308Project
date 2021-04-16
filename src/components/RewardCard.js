import { Card } from 'react-bootstrap';


function RewardCard(props={}) {
  const reward = props.reward;

  if (!reward) {
    return null;
  }

  return (
    <Card>
      <Card.Header>
        {reward.title}
      </Card.Header>
      <Card.Body>
        {reward.description}
        {reward.company}
      </Card.Body>
    </Card>
  );
}


export default RewardCard;

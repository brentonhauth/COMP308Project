import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import ChallengeCard from '../../components/ChallengeCard';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import * as api from '../../api/Challenge';
import Loading from '../../components/Loading';
import Toast from '../../helpers/Toast';
import { Container } from 'react-bootstrap';
import RewardCard from '../../components/RewardCard';
import _get from 'lodash.get';


function ParticipantBlock({ participant, challenge }={}) {
  const id = _get(participant, '_id', null);
  if (!id) {
    return null;
  }

  const percent = (participant.progress / challenge.distance * 100).toFixed(2);

  console.log(participant);

  return (
    <Container className="w-75">
      <h4>Progress</h4>
      <h5>{participant.progress} KM&emsp;({percent}%)</h5>
      <div className="w-100 text-right">
        {/* <span className="display-block mr-0">
          </span> */}
          {/* <div className="text-right"
          style={{
            width: `${Math.min(percent, 90)}%`
          }}>
            {participant.progress} */}
          {/* </div> */}
          {challenge.distance} KM
      </div>
      <div className="w-100 bg-primary rounded-pill">
        <div
        className="mr-0 bg-success rounded-pill"
        style={{
          height: '25px',
          width:`${percent}%`
        }}></div>
      </div>
    </Container>
  );
  
}


class $ChallengeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      participant: null,
      challenge: null,
    };
    this.tryGettingChallenge = this.tryGettingChallenge.bind(this);
    this.tryGettingProgress = this.tryGettingProgress.bind(this);
  }

  componentDidMount() {
    this.tryGettingChallenge();
    this.tryGettingProgress();
  }
  
  async tryGettingChallenge() {
    const id = this.props.id;
    api.getChallenge(id).then(challenge => {
      this.setState({ fetching: false, challenge });
    }).catch(err => {
      Toast.error(err);
      this.setState({ fetching: false });
    });
  }

  async tryGettingProgress() {
    const id = this.props.id;
    return api.getChallengeProgress(id).then(participant => {
      this.setState({ participant });
    }).catch(x=>x);
  }

  render() {
    const { fetching, challenge, participant } = this.state;
    if (fetching) {
      return <Loading />
    } else if (!challenge) {
      Toast.error('Challenge doesn\'t exist');
      return <Redirect to="/challenges" />
    }

    return (
      <Container>
        <ChallengeCard challenge={challenge} />
        <RewardCard reward={challenge.reward} />
        <ParticipantBlock participant={participant} challenge={challenge} />
      </Container>
    );
  }
}


export default function ChallengeDetailPage() {
  const { id } = useParams();
  return (
    <EnsureLoggedIn>
      <$ChallengeDetailPage id={id} />
    </EnsureLoggedIn>
  );
}





import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import ChallengeCard from '../../components/ChallengeCard';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import * as api from '../../api/Challenge';
import Loading from '../../components/Loading';
import Toast from '../../helpers/Toast';
import { Container } from 'react-bootstrap';

class $ChallengeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      challenge: null,
    };
    this.tryGettingChallenge = this.tryGettingChallenge.bind(this);
  }

  componentDidMount() {
    this.tryGettingChallenge();
  }
  
  tryGettingChallenge() {
    const id = this.props.id;
    api.getChallenge(id).then(challenge => {
      this.setState({ fetching: false, challenge });
    }).catch(err => {
      Toast.error(err);
      this.setState({ fetching: false });
    });
  }

  render() {
    const { fetching, challenge } = this.state;
    if (fetching) {
      return <Loading />
    } else if (!challenge) {
      Toast.error('Challenge doesn\'t exist');
      return <Redirect to="/challenges" />
    }

    return (
      <Container>
        <ChallengeCard challenge={challenge} />
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





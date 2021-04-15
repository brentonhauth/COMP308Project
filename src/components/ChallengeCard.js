import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _get from 'lodash.get';

import * as api from '../api/Challenge';
import Toast from '../helpers/Toast';


const REWARD_BADGE_CSS = { fontSize: '.75rem' };

export default class ChallengeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disableParticipate: false };
    this.tryParticipate = this.tryParticipate.bind(this);
  }

  async tryParticipate() {
    this.setState({ disableParticipate: true });
    const _id = _get(this.props, 'challenge._id');
    try {
      const result = await api.participateInChallenge(_id);
      Toast.success(`Participated in "${_get(result, 'challenge.title', _id)}"`);
    } catch (err) {
      Toast.error(err);
    }
    this.setState({ disableParticipate: false });  
  }

  render() {
    const challenge = this.props.challenge;

    if (!challenge) {
      return null;
    }

    // challenge.reward = 1;
    return (
      <Card className="mx-auto w-75 mb-5">
        <Card.Header className="d-flex justify-content-between">
          <span>
            <Link to={`/challenges/${challenge._id}`} className="h4 text-dark">
              {challenge.title}
            </Link>&nbsp;
            {challenge.reward &&
              <span
                style={REWARD_BADGE_CSS}
                class="badge bg-warning text-sm rounded-pill"
              >Rewarded</span>
            }
          </span>
          <Button
            onClick={this.tryParticipate}
            variant="success"
            className="h-50 mr-0 w-25"
            size="sm"
            disabled={this.state.disableParticipate/*todo: disable if is coach */}
          >Participate</Button>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {challenge.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Available Until: {challenge.closes}
        </Card.Footer>
      </Card>
    );
  }
}

import React from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _get from 'lodash.get';

import * as api from '../api/Challenge';
import Toast from '../helpers/Toast';
import YouTubeVideo from './YouTubeVideo';

export default class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableParticipate: false,
      watchVideo: false,
    };
    this.tryParticipate = this.tryParticipate.bind(this);
  }

  async tryParticipate() {
    this.setState({ disableParticipate: true });
    const _id = _get(this.props, 'activity._id');
    try {
      const result = await api.participateInChallenge(_id);
      Toast.success(`Participated in "${_get(result, 'activity.title', _id)}"`);
    } catch (err) {
      Toast.error(err);
    }
    this.setState({ disableParticipate: false });  
  }

  render() {
    const activity = this.props.activity;

    if (!activity) {
      return null;
    }
    console.log(activity);

    // activity.reward = 1;
    return (
      <Card className="mx-auto">
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={this.props.ekey || '0'}>
            <span className="mr-0">
              {activity.title}
              {/* {activity.reward &&
                <span
                  style={REWARD_BADGE_CSS}
                  class="badge bg-warning text-sm rounded-pill"
                >Rewarded</span>} */}
            </span>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.ekey || '0'}>
          <Card.Body>
            {activity.description}
            <br></br>
            {activity.hyperlink}
            {<YouTubeVideo hyperlink={activity.hyperlink} />}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

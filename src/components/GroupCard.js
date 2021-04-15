import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _get from 'lodash.get';

import * as api from '../api/Group';
import Toast from '../helpers/Toast';


export default class GroupCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disableLeave: false };
    this.tryLeaveGroup = this.tryLeaveGroup.bind(this);
  }

  async tryLeaveGroup() {
    this.setState({ disableLeave: true });
    const groupId = _get(this.props, 'group._id');
    try {
      if (groupId) {
        await api.leaveGroup(groupId);
      } else {
        throw new Error('Invalid group id');
      }
    } catch (err) {
      Toast.error(err);
    }
    this.setState({ disableLeave: false });
  }

  render() {
    const group = this.props.group || {};
    const coach = group.coach;
    return (
      <Card className="mx-auto w-75">
        <Card.Header className="d-flex justify-content-between">
          <Link to={`/groups/${group._id}`} className="h3 text-dark">[{group._id}] {group.name}</Link>
          <Button
            onClick={this.tryLeaveGroup}
            variant="danger"
            className="h-50 mr-0"
            size="sm"
            disabled={this.state.disableLeave/*todo: disable if is coach */}
            style={{width:'10%'}}
          >Leave</Button>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Coach:{'\x20'}
            {typeof coach === 'string' ? coach : (
              <span>
                {coach.firstName} {coach.lastName}
              </span>
            )}
            <br></br>
            Members: <span className="text-success">{_get(group, 'members.length', 0)}</span>
            <br></br>
            Activities: <span className="text-success">{_get(group, 'activities.length', 0)}</span>
            <br></br>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

import React from 'react';
import { Container, Button, Accordion } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../api/Group';
import GroupCard from '../../components/GroupCard';
import Toast from '../../helpers/Toast';
import SortTable from '../../components/SortTable';
import Loading from '../../components/Loading';
import _get from 'lodash.get';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import { connect } from 'react-redux';
import { joinGroup, leaveGroup } from '../../redux/Actions';
import ActivityCard from '../../components/ActivityCard';
import CreateActivityDialog from '../../components/CreateActivityDialog';


class $GroupDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { group: null, showCreateDialog: false };
    this.tryGettingGroup = this.tryGettingGroup.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
  }

  componentDidMount() {
    this.tryGettingGroup();
  }

  tryGettingGroup() {
    const id = this.props.id;
    api.getGroup(id).then(group => {
      this.setState({ group });
    }).catch(Toast.error);
  }

  onDialogClose(changes) {
    this.setState({ showCreateDialog: false });
    if (changes) {
      this.tryGettingGroup();
    }
  }

  render() {
    const group = this.state.group;
    if (!group) {
      return <Loading />
    }

    const members = _get(group, 'members', []);
    const activities = _get(group, 'activities', []);
    const coachId = _get(group, 'coach._id');
    const myId = _get(this.props, 'me._id', null);
    const isCoach = coachId === myId;

    return (
      <Container className="pb-5">
        <GroupCard group={group} />
        <h3>Members <span className="text-success">({members.length || 0})</span></h3>
        <SortTable data={members}>
          <SortTable.Col heading="ID" sort="_id">
            {m => <small>{m._id}</small>}
          </SortTable.Col>
          <SortTable.Col heading="Name" sort="lastName">
            {m => <span>{m.firstName} {m.lastName}</span>}
          </SortTable.Col>
          {isCoach &&
          <SortTable.Col>
            {m => <Button variant="danger" size="sm" className="rounded-pill">Remove</Button>}
          </SortTable.Col>}
        </SortTable>
        <hr></hr>
        <br></br>
        <h3>
          Activities <span className="text-success">({activities.length || 0})</span>
          {isCoach &&
          <Button
            className="w-1w0"
            variant="light"
            onClick={() => this.setState({ showCreateDialog: true })}
          >+</Button>}
        </h3>
        <CreateActivityDialog groupId={this.props.id} show={this.state.showCreateDialog} onClose={this.onDialogClose} />
        <Accordion defaultActiveKey="0">
          {activities.map((activity, index) => (
            <ActivityCard activity={activity} ekey={String(index)} key={index} />
          ))}
        </Accordion>
      </Container>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ ...state });
const mapDispatchToProps = { joinGroup, leaveGroup };
const Connected = connect(mapStateToProps, mapDispatchToProps)($GroupDetailPage);

export default function GroupDetailPage() {
  // Workaround for using params in stateful component
  const { id } = useParams();
  return (
    <EnsureLoggedIn>
      <Connected id={id} />
    </EnsureLoggedIn>
  );
}

import React from "react";
import * as api from '../../api/Group';
import { Container } from "react-bootstrap";
import Toast from "../../helpers/Toast";
import GroupCard from '../../components/GroupCard';

export default class GroupListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [] };
    this.tryGettingGroups = this.tryGettingGroups.bind(this);
    this.tryJoinGroup = this.tryJoinGroup.bind(this);
  }

  tryGettingGroups() {
    api.getMyGroups().then(groups => {
      this.setState({ groups });
    }).catch(Toast.error);
  }

  tryJoinGroup() {
  }

  componentDidMount() {
    this.tryGettingGroups();
  }

  render() {
    const groups = Array.isArray(this.state.groups) ? this.state.groups : ['uwu'];
    return (
      <Container>
        {groups.map((group, index) => (
          <GroupCard group={group} key={index} />
        ))}
      </Container>
    );
  }
}

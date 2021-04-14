import React from "react";
import * as api from '../api/Group';
import { Container } from "react-bootstrap";
import Toast from "../helpers/Toast";

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
          <Container key={index}>
            {JSON.stringify(group)}
          </Container>
        ))}
      </Container>
    );
  }
}

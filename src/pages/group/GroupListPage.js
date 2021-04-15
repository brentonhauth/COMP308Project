import React from "react";
import * as api from '../../api/Group';
import { Container, FormControl, Row, Col, Button } from "react-bootstrap";
import Toast from "../../helpers/Toast";
import GroupCard from '../../components/GroupCard';
import FormWrapper from '../../components/FormWrapper';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import CreateGroupDialog from '../../components/CreateGroupDialog';

export default class GroupListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      showCreateGroup: false
    };
    this.tryGettingGroups = this.tryGettingGroups.bind(this);
    this.tryJoinGroup = this.tryJoinGroup.bind(this);
    this.onCreateGroupClose = this.onCreateGroupClose.bind(this);
  }

  tryGettingGroups() {
    api.getMyGroups().then(groups => {
      this.setState({ groups });
    }).catch(Toast.error);
  }

  onCreateGroupClose(changes) {
    this.setState({ showCreateGroup: false });
    if (changes) {
      this.tryGettingGroups();
    }
  }

  async tryJoinGroup({ groupCode }={}) {
    try {
      await api.joinGroup(groupCode);
      this.tryGettingGroups();
    } catch (err) {
      throw err;
    }
  }

  componentDidMount() {
    this.tryGettingGroups();
  }

  render() {
    const groups = Array.isArray(this.state.groups) ? this.state.groups : [];
    return (
      <EnsureLoggedIn>
        <Container>
          <FormWrapper onSubmit={this.tryJoinGroup}>
            {sending => <>
              <Row>
                <Col>
                  <FormControl type="text" placeholder="Group Code" name="groupCode" required />
                </Col>
                <Col>
                  <Button variant="success" type="submit" disabled={sending}>JOIN</Button>
                </Col>
              </Row>
            </>}
          </FormWrapper>
          <h3>My Groups</h3>
          {groups.map((group, index) => (
            <GroupCard group={group} key={index} />
          ))}
          <Row className="align-items-center">
            <Col className="w-100">
              <Button
                variant="light"
                size="lg"
                className="mx-auto"
                style={{width:'200px'}}
                onClick={() => this.setState({ showCreateGroup: true })}
              >+</Button>
            </Col>
          </Row>
        </Container>
        <CreateGroupDialog show={this.state.showCreateGroup} onClose={this.onCreateGroupClose} />
      </EnsureLoggedIn>
    );
  }
}

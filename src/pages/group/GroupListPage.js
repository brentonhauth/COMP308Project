import React from "react";
import * as api from '../../api/Group';
import { Container, FormControl, Row, Col, Button } from "react-bootstrap";
import Toast from "../../helpers/Toast";
import GroupCard from '../../components/GroupCard';
import FormWrapper from '../../components/FormWrapper';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import CreateGroupDialog from '../../components/CreateGroupDialog';
import Loading from "../../components/Loading";

class $GroupListPage extends React.Component {
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
    const groups = this.state.groups;
    if (!Array.isArray(groups)) {
      return <Loading />
    }

    return (
      <Container className="py-4">
        <Row>
          <Col className="h3">
            My Groups&nbsp;&nbsp;
            <Button
                variant="outline-info"
                size="sm"
                onClick={() => this.setState({ showCreateGroup: true })}
              >Create</Button>
          </Col>
          <Col>
            <FormWrapper onSubmit={this.tryJoinGroup}>
              {sending => <>
                <Row>
                  <Col sm={4}>
                    <FormControl type="text" placeholder="Group Code" name="groupCode" required />
                  </Col>
                  <Col>
                    <Button variant="success" type="submit" disabled={sending}>JOIN</Button>
                  </Col>
                </Row>
              </>}
            </FormWrapper>
          </Col>
        </Row>
        <hr></hr>
        {groups.map((group, index) => (
          <GroupCard group={group} key={index} />
        ))}
        <CreateGroupDialog show={this.state.showCreateGroup} onClose={this.onCreateGroupClose} />
      </Container>
    );
  }
}


export default function GroupListPage() {
  return (
    <EnsureLoggedIn>
      <$GroupListPage />
    </EnsureLoggedIn>
  );
}

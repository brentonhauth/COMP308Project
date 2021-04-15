import React from "react";
import * as api from '../../api/Challenge';
import { Container, FormControl, Row, Col, Button } from "react-bootstrap";
import Toast from "../../helpers/Toast";
import ChallengeCard from '../../components/ChallengeCard';
import FormWrapper from '../../components/FormWrapper';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import CreateGroupDialog from '../../components/CreateGroupDialog';
import Loading from "../../components/Loading";

class $ChallengeListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      showCreateGroup: false
    };
    this.tryGettingChallenges = this.tryGettingChallenges.bind(this);
    // this.tryJoinGroup = this.tryJoinGroup.bind(this);
    this.onCreateGroupClose = this.onCreateGroupClose.bind(this);
  }

  tryGettingChallenges() {
    api.getAvailableChallenges().then(challenges => {
      this.setState({ challenges });
    }).catch(Toast.error);
  }

  onCreateGroupClose(changes) {
    this.setState({ showCreateGroup: false });
    if (changes) {
      this.tryGettingChallenges();
    }
  }

  // async tryJoinGroup({ groupCode }={}) {
  //   try {
  //     await api.joinGroup(groupCode);
  //     this.tryGettingChallenges();
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  componentDidMount() {
    this.tryGettingChallenges();
  }

  render() {
    const challenges = this.state.challenges;
    if (!Array.isArray(challenges)) {
      return <Loading />
    }

    return (
      <Container>
        {/* <FormWrapper onSubmit={this.tryJoinGroup}>
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
        </FormWrapper> */}
        <h3>Available Challenges</h3>
        {challenges.map((challenge, index) => (
          <ChallengeCard challenge={challenge} key={index} />
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
        {/* <CreateGroupDialog show={this.state.showCreateGroup} onClose={this.onCreateGroupClose} /> */}
      </Container>
    );
  }
}


export default function ChallengeListPage() {
  return (
    <EnsureLoggedIn>
      <$ChallengeListPage />
    </EnsureLoggedIn>
  );
}

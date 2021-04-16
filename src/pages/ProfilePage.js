import React from 'react';
import { Container, Row, Col, FormLabel, FormControl, Button } from 'react-bootstrap';
import EnsureLoggedIn from '../components/EnsureLoggedIn';
import { connect } from 'react-redux';
import { login } from '../redux/Actions';
import FormWrapper from '../components/FormWrapper';
import * as api from '../api/Account';
import Toast from '../helpers/Toast';

class $ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.trySendingFitdata = this.trySendingFitdata.bind(this);
  }

  trySendingFitdata(data) {
    return api.sendFitData(data).then(updated => {
      console.log('Updated', updated);
      this.props.login(updated, this.props.token);
    });
  }

  render() {
    const { me } = this.props;
    console.log('MEEEE', me);
    return (
      <Container className="w-75 mt-4">
        <h1>{me.firstName} {me.lastName}</h1>
        <Container className="w-75">
          <FormWrapper onSubmit={this.trySendingFitdata}>
            {sending => <>
              <Row>
                <Col><FormLabel className="text-end mr-0">Height</FormLabel></Col>
                <Col><FormControl required type="number" defaultValue={me.height} name="height" /></Col>
              </Row>
              <Row>
                <Col><FormLabel className="text-end mr-0">Waist</FormLabel></Col>
                <Col><FormControl required type="number" defaultValue={me.waist} name="waist" /></Col>
              </Row>
              <Row>
                <Col><FormLabel className="text-end mr-0">Pushup Score</FormLabel></Col>
                <Col><FormControl required type="number" defaultValue={me.pushupScore} name="pushupScore" /></Col>
              </Row>
              <Row>
                <Col><FormLabel className="text-end mr-0">Situp Score</FormLabel></Col>
                <Col><FormControl required type="number" defaultValue={me.situpScore} name="situpScore" /></Col>
              </Row>
              <Row>
                <Col><FormLabel className="text-end mr-0">Frequency</FormLabel></Col>
                <Col><FormControl required type="number" defaultValue={me.freq || 1} min={1} max={7} name="freq" /></Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" variant="success" disabled={sending}>UPDATE FITNESS DATA</Button>
                </Col>
              </Row>
            </>}
          </FormWrapper>
        </Container>
      </Container>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ ...state });
const mapDispatchToProps = { login };

const Connected = connect(mapStateToProps, mapDispatchToProps)($ProfilePage);

export default function ProfilePage() {
  return (
    <EnsureLoggedIn>
      <Connected />
    </EnsureLoggedIn>
  );
}

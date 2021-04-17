import UserRole from '../../types/UserRole';
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import { connect } from 'react-redux';
import { Container, FormControl, FormLabel } from 'react-bootstrap';
import FormWrapper from '../../components/FormWrapper';
import { Button } from 'react-bootstrap';
import * as api from '../../api/CustomerRep';
import Toast from '../../helpers/Toast';
import moment from 'moment';
import Loading from '../../components/Loading';
import _get from 'lodash.get';

const CREATE = 'create';
const FORMAT = "YYYY-MM-DD";

class $RepEditChallengePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {},
      exit: false
    };
    this.tryGettingChallenge = this.tryGettingChallenge.bind(this);
    this.trySending = this.trySending.bind(this);
    this.isCreateMode = this.isCreateMode.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  isCreateMode() {
    return this.props.id === CREATE;
  }

  async tryGettingChallenge() {
    try {
      const challenge = await api.getChallenge(this.props.id);
      this.setState({ challenge });
    } catch (err) {
      Toast.error(err);
    }
  }

  async trySending(data) {
    try {
      if (this.isCreateMode()) {
        await api.createChallenge(data);
      } else {
        await api.updateChallenge(this.props.id, data);
      }
      this.setState({ exit: true });
    } catch (err) {
      Toast.error(err);
    }
  }

  formatDate(date) {
    if (!date) {
      if (!this.isCreateMode()) {
        return null;
      }
      const d = new Date(Date.now());
      d.setMonth(d.getMonth() + 1);
      date = d;
    }
    return moment(date).format(FORMAT);
  }

  componentDidMount() {
    if (!this.isCreateMode()) {
      this.tryGettingChallenge();
    }
  }

  render() {
    const { challenge, exit } = this.state;

    
    if (exit) {
      return <Redirect to="/rep/challenges" />
    } else if (!this.isCreateMode() && !challenge._id) {
      return <Loading />
    }

    const closes = this.formatDate(challenge.closes);
    const rewardId = typeof challenge.reward === 'string' ?
      challenge.reward : _get(challenge, 'reward._id', '');
    //

    return (
      <Container>
        {this.isCreateMode() ? 'CREATE' : (`UPDATE ${this.props.id}`)}
        <FormWrapper onSubmit={this.trySending}>
          {sending => <>
            <FormLabel>Title</FormLabel>
            <FormControl defaultValue={challenge.title} name="title" required />
            <FormLabel>Distance</FormLabel>
            <FormControl defaultValue={challenge.distance} type="number" name="distance" required />
            <FormLabel>Closes</FormLabel>
            <FormControl defaultValue={closes} name="closes" type="date" required />
            <FormLabel>State</FormLabel>
            <FormControl defaultValue={challenge.state || 'A'} name="state" required />
            <FormLabel>Reward</FormLabel>
            <FormControl defaultValue={rewardId} type="text" name="reward" />
            <FormLabel>Description</FormLabel>
            <FormControl defaultValue={challenge.description} as="textarea" name="description" required />
            <Button type="submit" variant="success" disabled={sending}>
              {this.isCreateMode() ? 'CREATE' : 'UPDATE'}
            </Button>
          </>}
        </FormWrapper>
      </Container>
    );
  }
}


export default function RepEditChallengePage() {
  const { id } = useParams();
  return (
    <EnsureLoggedIn role={UserRole.CUSTOMER_REP}>
      <$RepEditChallengePage id={id} />
    </EnsureLoggedIn>
  );
}

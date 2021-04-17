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

const CREATE = 'create';
const FORMAT = "YYYY-MM-DD";
class $RepEditRewardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reward:[], exit:false};

    this.tryGettingReward = this.tryGettingReward.bind(this);
    this.trySending = this.trySending.bind(this);
    this.isCreateMode = this.isCreateMode.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  isCreateMode() {
    return this.props.id === CREATE;
  }
  async tryGettingReward() {
    try {
      const reward = await api.getReward(this.props.id);
      this.setState({ reward: reward });
    } catch (err) {
      Toast.error(err);
      console.log(err);
    }
  }

  async trySending(data) {
    try {
      if (this.isCreateMode()) {
        await api.createReward(data);
      } else {
        await api.updateReward(this.props.id, data);
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
      this.tryGettingReward();
    }
  }
  render() {
    const { reward, exit } = this.state;
    if (exit) {
      return <Redirect to="/rep/rewards" />
    } else if (!this.isCreateMode() && !reward._id) {
      return <Loading />
    }
    return (
      <Container>
        {this.isCreateMode() ? 'CREATE' : (`UPDATE ${this.props.id}`)}
        <FormWrapper onSubmit={this.trySending}>
          {sending => <>
            <FormLabel>Title</FormLabel>
            <FormControl defaultValue={reward.title} name="title" required />
            <FormLabel>Comapny</FormLabel>
            <FormControl defaultValue={reward.company} type="text" name="company" required />
            <FormLabel>Description</FormLabel>
            <FormControl defaultValue={reward.description} as="textarea" name="description" required />
            <Button type="submit" variant="success" disabled={sending}>
              {this.isCreateMode() ? 'CREATE' : 'UPDATE'}
            </Button>
          </>}
        </FormWrapper>
      </Container>
    );
  }
}


export default function RepEditRewardPage() {
  const { id } = useParams();
  return (
    <EnsureLoggedIn role={UserRole.CUSTOMER_REP}>
      <$RepEditRewardPage id={id} />
    </EnsureLoggedIn>
  );
}

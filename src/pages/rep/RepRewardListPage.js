import UserRole from '../../types/UserRole';
import React from 'react';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import { connect } from 'react-redux';
import * as api from '../../api/CustomerRep';
import Toast from "../../helpers/Toast";
import Loading from "../../components/Loading";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SortTable from '../../components/SortTable';

class $RepRewardListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rewards:[]};
    this.tryGettingRewards = this.tryGettingRewards.bind(this);
  }

  async tryGettingRewards()
  {
    try
    {
      await api.getAllRewards().then(rewards => 
        {
          this.setState({ rewards: rewards });
          console.log(rewards);
        });
    }
    catch(e)
    {
      Toast.error(e);
    }
  }
  componentDidMount() {
    this.tryGettingRewards();
  }
  render() {
    const rewards = this.state.rewards;
    return (
      <Container>
        <h3>All rewards
          <Link
            className="btn btn-info"
            to="/rep/rewards/create"
          >CREATE</Link>
        </h3>
        <SortTable data={rewards}>
          <SortTable.Col heading="ID" sort="_id">
            {c => <small>{c._id}</small>}
          </SortTable.Col>
          <SortTable.Col heading="Title" sort="title">
            {c => c.title}
          </SortTable.Col>
          <SortTable.Col heading="Company" sort="company">
            {c => c.company}
          </SortTable.Col>
          <SortTable.Col heading="Description" sort="description">
            {c => c.description}
          </SortTable.Col>
          <SortTable.Col>
            {c => <Link to={`/rep/rewards/${c._id}`} className="btn btn-sm rounded-pill btn-warning">Edit</Link>}
          </SortTable.Col>
        </SortTable>
      </Container>
    );

  }
}


export default function RepRewardListPage() {
  return (
    <EnsureLoggedIn role={UserRole.CUSTOMER_REP}>
      <$RepRewardListPage />
    </EnsureLoggedIn>
  );
}

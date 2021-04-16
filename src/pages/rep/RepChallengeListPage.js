import UserRole from '../../types/UserRole';
import React from 'react';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import { connect } from 'react-redux';
import SortTable from '../../components/SortTable';
import { Container } from 'react-bootstrap';
import * as api from '../../api/CustomerRep';
import { Link } from 'react-router-dom';
import Toast from '../../helpers/Toast';

class $RepChallengeListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };
    this.tryGettingChallenges = this.tryGettingChallenges.bind(this);
  }

  async tryGettingChallenges() {
    try {
      const challenges = await api.getAllChallenges();
      this.setState({ challenges });
    } catch (err) {
      Toast.error(err);
    }
  }

  componentDidMount() {
    this.tryGettingChallenges();
  }

  render() {
    const { challenges } = this.state;

    return (
      <Container>
        <h3>All Challenges
          <Link
            className="btn btn-info"
            to="/rep/challenges/create"
          >CREATE</Link>
        </h3>
        <SortTable data={challenges}>
          <SortTable.Col heading="ID" sort="_id">
            {c => <small>{c._id}</small>}
          </SortTable.Col>
          <SortTable.Col heading="Title" sort="title">
            {c => c.title}
          </SortTable.Col>
          <SortTable.Col heading="State" sort="state">
            {c => c.state}
          </SortTable.Col>
          <SortTable.Col heading="Closes" sort="closes">
            {c => c.closes}
          </SortTable.Col>
          <SortTable.Col>
            {c => <Link to={`/rep/challenges/${c._id}`} className="btn btn-sm rounded-pill btn-warning">Edit</Link>}
          </SortTable.Col>
        </SortTable>
      </Container>
    );
  }
}


export default function RepChallengeListPage() {
  return (
    <EnsureLoggedIn role={UserRole.CUSTOMER_REP}>
      <$RepChallengeListPage />
    </EnsureLoggedIn>
  );
}

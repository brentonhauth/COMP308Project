import UserRole from '../../types/UserRole';
import React from 'react';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import { connect } from 'react-redux';

class $RepRewardListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
  }
}


export default function RepRewardListPage() {
  return (
    <EnsureLoggedIn role={UserRole.CUSTOMER_REP}>
      <$RepRewardListPage />
    </EnsureLoggedIn>
  );
}

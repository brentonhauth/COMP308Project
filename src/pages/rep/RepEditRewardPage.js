import UserRole from '../../types/UserRole';
import React from 'react';
import { useParams } from 'react-router-dom';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import { connect } from 'react-redux';

class $RepEditRewardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
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

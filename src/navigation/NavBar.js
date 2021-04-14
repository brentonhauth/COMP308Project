import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import React from 'react';
// import { connect } from 'react-redux';
import * as api from '../api/Account';
// import { logout } from '../redux/Actions';
import Toast from '../helpers/Toast';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick() {
    api.logout().then(() => {
      this.props.logout();
    }).catch(err => {
      Toast.error(err.message);
    });
  }

  render() {
    const me = this.props.me;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {me ? <>
              <Link to={`/students/${me._id}`} className="nav-link">{}</Link>
              <Link to="/" className="nav-link" onClick={this.onLogoutClick}>Logout</Link>
            </> : <>
              <Link to="/signup" className="nav-link">Signup</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/groups" className="nav-link">Groups</Link>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default NavBar

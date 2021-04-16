import RBNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import React from 'react';
import { connect } from 'react-redux';
import * as api from '../api/Account';
import { logout } from '../redux/Actions';
import Toast from '../helpers/Toast';

function NavBar(props) {
  function onLogoutClick() {
    api.logout().then(() => {
      props.logout();
    }).catch(err => {
      props.logout(); // temp
    });
  }
  const me = props.me;
  const role = (me && me.role) || null;
  return (
    <RBNavbar bg="light" expand="lg">
      <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
      <RBNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {role === 'U' ? <>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/login" className="nav-link" onClick={onLogoutClick}>Logout</Link>
            <Link to="/groups" className="nav-link">Groups</Link>
            <Link to="/challenges" className="nav-link">Challenges</Link>
          </> : <>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>}
          {role === 'A' ? <>
          <Link to="/searchUser" className="nav-link">Search User</Link>
          </>
          :<></>
          }
        </Nav>
      </RBNavbar.Collapse>
    </RBNavbar>
  );
}


const mapStateToProps = (state, ownProps) => ({ ...state });
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

import React from 'react';
import ChallengeCard from '../../components/ChallengeCard';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import * as api from '../../api/Admin';
import Loading from '../../components/Loading';
import Toast from '../../helpers/Toast';
import { Container, FormControl } from 'react-bootstrap';
import FormWrapper from '../../components/FormWrapper';
import ListGroup from 'react-bootstrap/ListGroup';
import _get from 'lodash.get';
import { withRouter } from 'react-router-dom';

class SearchUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set to empty object
      foundUser: []
    };

    /*
    All methods that are not inherited by React.Component (like 'render()')
    must be bound to this object like so:
    */
    this.trySearchingUser = this.trySearchingUser.bind(this);
  }

  /**
   * 
   * @param {*} searchData - searchData will be given to the user from the FormWrapper
   */
  async trySearchingUser(searchData) {
    try {
      const foundUser = await api.searchUser(searchData);
      // Once we retreived the user, set it to state
      this.setState({
        foundUser: foundUser
      });
    } catch (err) {
      // Will display error
      Toast.error(err);
    }
  }

  render() {
    // Unpack from state (easier to read)
    const foundUser = this.state.foundUser;
    const showDetail = (id) => {
      this.props.history.push({
        pathname: '/admin/user/:id' + id
      });
    }
    return(
      <EnsureLoggedIn message="You are not an admin">
        <Container>
          {/* makes sending api requests easy */}
          <FormWrapper onSubmit={this.trySearchingUser}>
            {() => (
              <Container>
                {/* * implement FormControl (with name="email") & Button (with type="submit") for searching */}
                <label htmlFor="email" className="floatLabel" type="text">User Email</label>
                <input type="text" placeholder="Type user email" name="email" required/>
                <button type="submit">Search</button>
              </Container>
            )}
          </FormWrapper>

          {/* Display 'foundUser' how you like, I've used JSON.stringify as a temporary solution */}
          {/* {<div>{JSON.stringify(foundUser)}</div>} */}
          {foundUser.length !== 0
          ?<>
          <div>
          <ListGroup.Item  action onClick={() => { showDetail(_get(foundUser, '[0]._id')) }}>
            {_get(foundUser, '[0].firstName')}&nbsp;{_get(foundUser, '[0].lastName')}<br></br>
            {_get(foundUser, '[0].email')}    
             </ListGroup.Item>
          </div>
          </>
          :<></>}
        </Container>
      </EnsureLoggedIn>
    );
  }
}
export default withRouter(SearchUserPage);

import '../../styles/signup.css'

import React from 'react';
import { updateUser } from '../../api/Admin';
import FormWrapper from '../../components/FormWrapper';
import Toast from '../../helpers/Toast';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as api from '../../api/Admin';

class UpdateUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{}
    };
    this.tryUpdate = this.tryUpdate.bind(this);
  }

  componentDidMount() {
    const fetchData = async () => {
      try
      {
          const foundUser = await api.searchUserById(this.props.match.params.id);
          this.setState({
            user: foundUser
          });
          console.log(foundUser);
      }
      catch(e)
      {
          Toast.error(e);
          console.log(e);
      }
    };
    fetchData();
  }

  async tryUpdate(data) {
    try {
      const value = await updateUser(this.props.match.params.id,data);
      Toast.success('SUCCESS');
      this.setState({ successful: true });
    } catch (err) {
      Toast.error(err.message);
    }
  }

  render() {
    const user = this.state.user;
    // if (this.props.me) {
    //   Toast.error('Already logged in');
    //   return <Redirect to="/" />
    // }
    return (
      <div className="signUpForm-v2">
        <h2>Update User</h2>
        <hr></hr>
        <FormWrapper onSubmit={this.tryUpdate}>
          {sending => <>
            <p className="tableSection">
              Personal Information
            </p>
            <p className="double">
              <label htmlFor="firstName" className="floatLabel" type="text">First Name</label>                
              <input type="text" defaultValue={user.firstName} name="firstName" required/>

              <label htmlFor="lastName" className="floatLabel" type="text">Last Name</label>                
              <input type="text" defaultValue={user.lastName} name="lastName" required/>
            </p>
            <p>
              <label htmlFor="email" className="floatLabel" type="text">Email</label>                
              <input type="text" defaultValue={user.email} name="email" required/>
            </p>
            <p>
              <label htmlFor="role" className="floatLabel" type="text">Role</label>                
              <input type="text" defaultValue={user.role} name="role" required/>
            </p>
            <p>
              <label htmlFor="password" className="floatLabel" type="text">Password</label>                
              <input type="text" defaultValue={user.password} name="password" required/>
            </p>
            <p>
              <label htmlFor="age" className="floatLabel" type="text">Age</label>                
              <input type="text" defaultValue={user.age} name="age" required/>
            </p>
            <p>
              <label htmlFor="gender" className="floatLabel" type="text">Gender</label>                
              <input type="text" defaultValue={user.gender} name="gender" required/>
            </p>
            <hr></hr>
            <button type="submit">Update</button>
          </>}
        </FormWrapper>
      </div>
    );
  }
}
export default withRouter(UpdateUserPage);

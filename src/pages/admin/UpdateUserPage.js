import '../styles/signup.css'

import React from 'react';
import { updateUser } from '../../api/Admin';
import FormWrapper from '../../components/FormWrapper';
import Toast from '../../helpers/Toast';
import { Redirect } from 'react-router-dom';

export default class UpdateUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{}
    };
    this.tryUpdate = this.tryUpdate.bind(this);
  }

  async tryUpdate(data) {
    try {
      const value = await updateUser(data);
      Toast.success('SUCCESS');
      this.setState({ successful: true });
    } catch (err) {
      Toast.error(err.message);
    }
  }

  render() {
    if (this.state.successful) {
      return <Redirect to="/login" />;
    }

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
              <input type="text" placeholder="John" name="firstName" required/>

              <label htmlFor="lastName" className="floatLabel" type="text">Last Name</label>                
              <input type="text" placeholder="Doe" name="lastName" required/>
            </p>
            <p>
              <label htmlFor="email" className="floatLabel" type="text">Email</label>                
              <input type="text" placeholder="someone@example.com" name="email" required/>
            </p>
            <hr></hr>
            <p className="tableSection">
              Account Information
            </p>
            <p className="double">
              <label htmlFor="studentNumber" className="floatLabel" type="text">Student Number</label>                
              <input type="text" placeholder="300941374" name="studentNumber" required/>

              <label htmlFor="program" className="floatLabel" type="text">Program</label>                
              <input type="text" placeholder="Game Programming" name="program" required/>
            </p>
            <p>
              <label htmlFor="phone" className="floatLabel" type="text">Phone</label>                
              <input type="text" placeholder="1111234567" name="phone" required/>
            </p>
            <hr></hr>
            <p className="tableSection">
              Address
            </p>
            <p className="double">
              <label htmlFor="address" className="floatLabel" type="text">Address</label>                
              <input type="text" placeholder="47 Some Street" name="address" required/>

              <label htmlFor="city" className="floatLabel" type="text">City</label>                
              <input type="text" placeholder="Toronto" name="city" required/>
            </p>
            <p>
              <label htmlFor="password" className="floatLabel" type="text">Password</label>                
              <input type="password" placeholder="*******" name="password" required/>
            </p>
            
            <button disabled={sending} type="submit">Sign Up</button>
          </>}
        </FormWrapper>
      </div>
    );
  }
}
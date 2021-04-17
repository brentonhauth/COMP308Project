import '../styles/signup.css'

import React from 'react';
import { signup } from '../api/Account';
import FormWrapper from '../components/FormWrapper';
import Toast from '../helpers/Toast';
import { Redirect } from 'react-router-dom';

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { successful: false };
    this.trySignup = this.trySignup.bind(this);
  }

  async trySignup(data) {
    try {
      const value = await signup(data);
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
        <h2>Sign Up</h2>
        <hr></hr>
        <FormWrapper onSubmit={this.trySignup}>
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
            <p>
              <label htmlFor="height" className="floatLabel" type="text">Height(CM)</label>                
              <input type="number" placeholder="180" name="height" required/>
            </p>
            <p>
              <label htmlFor="waist" className="floatLabel" type="text">Waist(KG)</label>                
              <input type="number" placeholder="80" name="waist" required/>
            </p>
            <hr></hr>
            <p className="tableSection">
              Age
            </p>
            <p className="double">
              <label htmlFor="age" className="floatLabel" type="text">Age</label>                
              <input type="number" placeholder="" name="age" required/>

              <label htmlFor="gender" className="floatLabel" type="text">Gender</label>                
              <select name="gender" id="gender">
              <option value= 'M'>Male</option>
              <option value='F'>Female</option>
              </select>
            </p>
            <p>
              <label htmlFor="password" className="floatLabel" type="text">Password</label>                
              <input type="password" placeholder="*******" name="password" required/>
            </p>
            <p>
              <label>Question 1</label>
              <input type="text" name="question1" placeholder="Favorite food?" required />
              <label>Answer 1</label>
              <input type="text" name="answer1" placeholder="Answer #1" required />
              <label>Question 2</label>
              <input type="text" name="question2" placeholder="First pets name?" required />
              <label>Answer 2</label>
              <input type="text" name="answer2" placeholder="Answer #2" required />
            </p>
            <button disabled={sending} type="submit">Sign Up</button>
          </>}
        </FormWrapper>
      </div>
    );
  }
}

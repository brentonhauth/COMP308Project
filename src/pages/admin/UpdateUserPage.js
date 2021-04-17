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
            <p className="double">
              <label htmlFor="firstName" className="floatLabel" type="text">First Name</label>                
              <input type="text" placeholder="John" name="firstName" defaultValue={user.firstName} required/>

              <label htmlFor="lastName" className="floatLabel" type="text">Last Name</label>                
              <input type="text" placeholder="Doe" name="lastName" defaultValue={user.lastName} required/>
            </p>
            <p>
              <label htmlFor="email" className="floatLabel" type="text">Email</label>                
              <input type="text" placeholder="someone@example.com" name="email"defaultValue={user.email} required/>
            </p>
            <hr></hr>
            <p>
              <label htmlFor="height" className="floatLabel" type="text">Height(CM)</label>                
              <input type="number" placeholder="180" name="height"defaultValue={user.height} required/>
            </p>
            <p>
              <label htmlFor="waist" className="floatLabel" type="text">Waist(KG)</label>                
              <input type="number" placeholder="80" name="waist"defaultValue={user.waist} required/>
            </p>
            <hr></hr>
            <p className="tableSection">
              Age
            </p>
            <p className="double">
              <label htmlFor="age" className="floatLabel" type="text">Age</label>                
              <input type="number" placeholder="" name="age"defaultValue={user.age} required/>

              <label htmlFor="gender" className="floatLabel" type="text">Gender</label>
              {
                user.gender === 'M'?
                <select name="gender" id="gender" defaultValue={'M'}>
                <option value= 'M'>Male</option>
                <option value='F'>Female</option>
                </select>
                :
                <select name="gender" id="gender" defaultValue={'F'}>
                <option value= 'M'>Male</option>
                <option value='F'>Female</option>
                </select>      
              }
            </p>
            <p>
              <label htmlFor="password" className="floatLabel" type="text">Password</label>                
              <input type="password" placeholder="*******" name="password" defaultValue={user.password}required/>
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

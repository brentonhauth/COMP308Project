import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import * as api from '../api/Account';
import FormWrapper from '../components/FormWrapper';
import Toast from '../helpers/Toast';
import { connect } from 'react-redux';
import { login } from '../redux/Actions';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.tryLogin = this.tryLogin.bind(this);
  }

  async tryLogin(data) {
    try {
      const res = await api.login(data);
      Toast.success('Successfully logged in');
      this.props.login(res.user, res.token);
    } catch (err) {
      Toast.error(err.message);
    }
  }

  render() {
    if (this.props.me) {
      // Toast.error('Already logged in');
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Container className="w-50">
          <h1>Login</h1>
          <hr></hr>
          <FormWrapper onSubmit={this.tryLogin}>
            {sending => <>
              <Form.Control type="email" placeholder="Email" name="username" required />
              <Form.Control type="password" placeholder="Password" name="password" required />
              <Button variant="success" type="submit" disabled={sending}>Login</Button>
            </>}
          </FormWrapper>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ ...state });
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

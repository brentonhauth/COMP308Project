import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import * as api from '../api/Account';
import FormWrapper from '../components/FormWrapper';
import Toast from '../helpers/Toast';
import { connect } from 'react-redux';
import { login } from '../redux/Actions';
import { Link, Redirect } from 'react-router-dom';
import Request from '../helpers/Request';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.tryLogin = this.tryLogin.bind(this);
  }

  async tryLogin(data) {
    try {
      const res = await api.login(data);
      this.props.login(res.user, res.token);
      Request.header('Authorization', `Bearer\x20${res.token}`);
      Toast.success('Successfully logged in');
    } catch (err) {
      Toast.error(err);
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
              <Form.Control type="email" className="rounded-pill my-3" placeholder="Email" name="email" required />
              <Form.Control type="password" className="rounded-pill my-3" placeholder="Password" name="password" required />
              <Button variant="success" type="submit" className="rounded-pill mt-2 w-100" disabled={sending}>Login</Button>
            </>}
          </FormWrapper>
          <Link to="/passreset">Forgot password?</Link>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ ...state });
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

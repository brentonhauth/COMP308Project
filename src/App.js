import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';
import config from './config';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.touchServer = this.touchServer.bind(this);
  }

  componentDidMount() {
    this.touchServer();
  }
  
  async touchServer() {
    const cookie = Cookies.get(config.SESS_COOKIE);
    if (!cookie) {
      return void this.setState({ loading: false });
    }
    try {
      // const student = await api.touch();
      //this.props.login(student, cookie);
    } catch (e) {}
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Container className="mt-3 mx-auto">
          <Spinner animation="border" role="status">
          </Spinner>
        </Container>
      );
    }

    return (
      <Router />
    );
  }
}

export default App;

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'toastify-js/src/toastify.css'

import React from 'react';
import Cookies from 'js-cookie';
import config from './config';
import * as api from './api/Account';
import Router from './navigation/Router';
import Request from './helpers/Request';
import Loading from './components/Loading';

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
      const user = await api.touch();
      this.props.login(user, cookie);
      Request.authorization(cookie);
    } catch (e) {}
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <Router />
    );
  }
}

export default App;

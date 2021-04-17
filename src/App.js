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
import { connect } from 'react-redux';
import { login } from './redux/Actions';

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
      const { user, token } = await api.touch();
      this.props.login(user, token);
      Request.authorization(token);
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
const mapStateToProps = (state, ownProps) => ({ ...state });
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(App);

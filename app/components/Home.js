// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import styles from './Home.css';
import Settings from 'electron-settings';
import GithubLogin from './GithubLogin';

export default class Home extends Component {

  static propTypes = {
    onTokenReceived: React.PropTypes.func
  };

  constructor() {
    super();
    this.loginDone = this.loginDone.bind(this);
    // Settings.deleteAll();
    var token = Settings.get('token');
    // this.props.onTokenReceived(token);
    this.state = {
      showingLogin: false,
      token: token
    };
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>

          {
            this.state.token ?
              <Redirect to="/main" />  :
              <GithubLogin
                onSuccess={this.loginDone}/>
          }
        </div>
      </div>
    );
  }

  loginDone(token) {
    Settings.set('token', token)
    this.setState({token});
  }

  _milestoneSelected(index) {

  }
}

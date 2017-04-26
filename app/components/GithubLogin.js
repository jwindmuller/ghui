import React, {
  Component
} from 'react';

export default class GithubLogin extends Component {

  constructor() {
    super();
    this.startLoginProcess = this.startLoginProcess.bind(this);
    this.tokenReceived = this.tokenReceived.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    return (
      <button style={styles.loginButton} onClick={this.startLoginProcess}>Login</button>
    );
  }

  startLoginProcess() {
    const electron = window.require('electron');
    // const require =  electron.remote.require;
    var githubOAuth = electron.remote.require('github-oauth')({
      githubClient: '294ec342e2071c2d4ae6',
      githubSecret: '7142879fde8a4a8ba8b5085b6e7d867d67f6da1d',
      baseURL: 'http://localhost:5001',
      loginURI: '/login',
      callbackURI: '/callback',
      scope: ['repo', 'user'] // optional, default scope is set to user
    })

    this.server = electron.remote.require('http').createServer(function(req, res) {
      if (req.url.match(/login/)) return githubOAuth.login(req, res)
      if (req.url.match(/callback/)) return githubOAuth.callback(req, res)
    }).listen(5001, 'localhost')

    githubOAuth.on('error', function(err) {
      console.error('there was a login error', err)
    })

    githubOAuth.on('token', this.tokenReceived)

    this.win = new electron.remote.BrowserWindow({
      width: 800, height: 600,
      webPreferences: {
        nodeIntegration :false
      }
    });
    this.win.on('close', this.handleClose);
    this.win.loadURL('http://localhost:5001/login');
  }

  handleClose() {
    this.server.close();
  }

  tokenReceived(token) {
    this.props.onSuccess(token);
    this.win.close();
    this.server.close();
  }
}

const styles = {
  loginButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius:5
  }
};

import React, {
  Component
} from 'react';
import Settings from 'electron-settings';
let github = require('octonode');
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './MainPage.css';
import SidebarSection from '../components/SidebarSection';

export default class MainPage extends Component {

  gh = null

  constructor() {
    super();
    this._getGithubClient = this._getGithubClient.bind(this);
    this.renderMilestones = this.renderMilestones.bind(this);
    this.renderMilestone = this.renderMilestone.bind(this);
    this.loadMilestones = this.loadMilestones.bind(this);
    this._milestonesReceived = this._milestonesReceived.bind(this);
    this._milestoneSelected = this._milestoneSelected.bind(this);
    this._renderCurrentMilestone = this._renderCurrentMilestone.bind(this);

    const token = Settings.get('token');
    this.state = {
      milestones: [],
      token : token,
      currentMilestone: false
    };
  }

  componentDidMount() {
    this.loadMilestones();
  }

  _getGithubClient() {
    if (this.gh === null) {
      this.gh = github.client(this.state.token.access_token);
    }
    return this.gh;
  }

  render() {
    return (
      <Grid fluid className={styles.MainPage__container}>
        <Row className={styles.MainPage__container}>
          <Col xs={3} md={3} className={styles.MainPage__sidebar}>{this.renderMilestones()}</Col>
          <Col xs={7} md={7}>Hi {this._renderCurrentMilestone()}</Col>
        </Row>
      </Grid>
    );
  }

  loadMilestones() {
    const client = this._getGithubClient();
    let rpm = client.repo('rpmsoftware/rpm');
    rpm.milestones(this._milestonesReceived);
  }

  _milestonesReceived(error, milestones, headers) {
      if (error) {
        console.log(error);
        alert('rpm.milestones error');
        return;
      }
      this.setState({milestones});
  }

  renderMilestones() {
    return (
      <SidebarSection
        title={'Changelogs'}
        items={this.state.milestones}
        onItemSelect={this._milestoneSelected} />
    );
  }

  renderMilestone(milestone) {
    return (
      <button className={styles.Milestone__container}>
        <p>
          <strong>{milestone.title}</strong>
          {
            milestone.description ? <span> - {milestone.description}</span> : null
          }
        </p>
      </button>
    );
  }

  _milestoneSelected(currentMilestone) {
    this.setState({currentMilestone});
  }

  _renderCurrentMilestone() {
    if (this.state.currentMilestone === false) {
      return null;
    }

    const milestone = this.state.milestones[this.state.currentMilestone];
    return (
      <span>{milestone.title}</span>
    );
  }

}

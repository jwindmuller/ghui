import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Settings from 'electron-settings';
import MilestoneStyles from './Milestone.css';
import Issue from './Issue';

export default class MainPage extends Component {

  static propTypes = {
    milestone: PropTypes.object,
    repo: PropTypes.object
  };

  constructor() {
    super();
    this._getIssues = this._getIssues.bind(this);
    this._issuesReceived = this._issuesReceived.bind(this);
    this._renderIssue = this._renderIssue.bind(this);
    this.state = {
      issues: []
    }
  }

  componentDidMount() {
    this.setState({milestone:this.props.milestone, issues:[]}, this._getIssues);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({milestone:nextProps.milestone, issues:[]}, this._getIssues);
  }

  _getIssues() {
    this.props.repo.issues({
      milestone: this.state.milestone.number,
      state: 'all'
    }, this._issuesReceived);
  }

  _issuesReceived(error, issues, headers) {
    this.setState({issues});
  }

  render() {
    return (
      <div className={MilestoneStyles.__container}>
        <h1 className={MilestoneStyles.__title}>{this.props.milestone.title}</h1>
        <div className={MilestoneStyles.__issues_container}>
          {
            this.state.issues.map(this._renderIssue)
          }
        </div>
      </div>
    );
  }

  _renderIssue(issue, index) {
    return (
      <Issue issue={issue} index={index} key={issue.id}/>
    )
  }
}

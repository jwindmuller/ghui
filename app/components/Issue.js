import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Settings from 'electron-settings';
import IssueStyles from './Issue.css';

export default class Issue extends Component {

  static propTypes = {
    index: PropTypes.number,
    issue: PropTypes.object
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className={IssueStyles.__container}>
        <h2 className={IssueStyles.__title}>{this.props.issue.title}</h2>

      </div>
    );
  }
}

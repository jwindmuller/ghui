import React, {
  Component
} from 'react';
import Settings from 'electron-settings';
import IssueStyles from './Issue.css';

export default class Issue extends Component {

  static propTypes = {
    index: React.PropTypes.integer,
    issue: React.PropTypes.obj
  };

  constructor() {
    super();
  }

  render() {
    debugger
    return (
      <div className={IssueStyles.__container}>
        <h2 className={IssueStyles.__title}>{this.props.issue.title}</h2>

      </div>
    );
  }
}

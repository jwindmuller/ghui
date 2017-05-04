import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Settings from 'electron-settings';
import IssueStyles from './Issue.css';
import GithubLabel from './GithubLabel';

export default class Issue extends Component {

  static propTypes = {
    index: PropTypes.number,
    issue: PropTypes.object
  };

  constructor() {
    super();
    this._checkedChanged = this._checkedChanged.bind(this);
    this._renderLabels = this._renderLabels.bind(this);
    this.state = {
      checked: true
    };
  }

  _checkedChanged() {
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div className={IssueStyles.__container}>
        <h2 className={IssueStyles.__title}>
          {this.props.issue.title}
        </h2>
        {this._renderLabels()}
      </div>
    );
  }

  _renderLabels() {
    let labels = this.props.issue.labels.map(label => {
      return (
        <GithubLabel label={label} key={`label-${label.id}`} />
      );
    });

    return(
      <div className={IssueStyles.__labels_container}>
        {labels}
      </div>
    )
  }
}

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
    this._checkedChanged = this._checkedChanged.bind(this);
    this.state = {
      checked: true
    };
  }

  _checkedChanged() {
    this.setState({checked: !this.state.checked});
  }

  render() {
    let checkboxProps = {
      type: 'checkbox',
      onChange: this._checkedChanged
    };
    if (this.state.checked) {
      checkboxProps.checked = 'checked';
    }
    return (
      <div className={IssueStyles.__container}>
        <h2 className={IssueStyles.__title}>
          <label>
            <input {...checkboxProps}/>
            {this.props.issue.title}
          </label>
        </h2>

      </div>
    );
  }
}

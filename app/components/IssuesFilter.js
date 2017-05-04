import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Settings from 'electron-settings';
import IssuesFilterStyles from './IssuesFilter.css';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
import GithubLabel from './GithubLabel';


export default class IssuesFilter extends Component {
  static propTypes = {
    labels: PropTypes.array
  }

  constructor() {
    super();
    this._logChange = this._logChange.bind(this);
    this._renderOptionForLabel = this._renderOptionForLabel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.labels) {
      let labels = nextProps.labels.map((label) => {
        label.label = label.name;
        label.value = label.id;
        return label;
      });
      this.setState({labels});
    }
  }

  render() {
    return (
      <div className={IssuesFilterStyles.__container}>
        <MultiSelect
          name="form-field-name"
          value="one"
          theme = "bootstrap3"
          options={this.props.labels}
          renderOption={this._renderOptionForLabel}
          renderValue={this._renderOptionForLabel}

        />
      </div>
    )
  }

  _logChange() {
    debugger
  }

  _renderOptionForLabel(option) {
    return (
      <div className={IssuesFilterStyles.__option_container}>
        <GithubLabel label={option} />
      </div>
    );
  }
}

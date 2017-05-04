import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Settings from 'electron-settings';
import IssueStyles from './Issue.css';
import Color from 'color';

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
    let labels = this.props.issue.labels.map(function(label) {
      var labelColor = new Color(`#${label.color}`);
      let labelProps = {
        className: [IssueStyles.__label],
        style: {
          backgroundColor: labelColor.string()
        },
        key: `label-${label.id}`
      };
      var contrastWhite = labelColor.contrast(new Color('#fff'));
      var contrastBlack = labelColor.contrast(new Color('#000'));

      if (contrastWhite < 2 && contrastWhite < contrastBlack) {
        labelProps.className.push(IssueStyles.__label_inverse);
      }
      labelProps.className = labelProps.className.join(' ');

      return (
        <span {...labelProps}>
          {label.name}
        </span>
      );
    });

    return(
      <div className={IssueStyles.__labels_container}>
        {labels}
      </div>
    )
  }
}

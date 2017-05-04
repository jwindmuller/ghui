import React, {
  Component
} from 'react';

import GihubLabelStyles from './GithubLabel.css';
import Color from 'color';

export default class GihubLabel extends Component {

  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {

  }


  render() {
    var labelColor = new Color(`#${this.props.label.color}`);
    let labelProps = {
      className: [GihubLabelStyles.__label],
      style: {
        backgroundColor: labelColor.string()
      }
    };
    var contrastWhite = labelColor.contrast(new Color('#fff'));
    var contrastBlack = labelColor.contrast(new Color('#000'));

    if (contrastWhite < 2 && contrastWhite < contrastBlack) {
      labelProps.className.push(GihubLabelStyles.__label_inverse);
    }
    labelProps.className = labelProps.className.join(' ');

    return (
      <span {...labelProps}>
        {this.props.label.name}
      </span>
    );
  }
}

import React, {
  Component
} from 'react';
import SidebarSectionStyles from './SidebarSection.css';

export default class SidebarSectionItem extends Component {

  constructor() {
    super();
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  render() {
    return (
      <button
        key={`SidebarSection_item_${this.props.index}`}
        className={SidebarSectionStyles.__item}
        onClick={this.onItemSelect}>
        <p className={SidebarSectionStyles.__item_wrap}>
          <strong>{this.props.item.title}</strong>
          {
            this.props.item.description &&
              <span> - {this.props.item.description}</span>
          }
        </p>
      </button>
    );
  }

  onItemSelect() {
    this.props.onItemSelect(this.props.index);
  }

}

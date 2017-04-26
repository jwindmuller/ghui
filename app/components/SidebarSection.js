import React, {
  Component
} from 'react';
import SidebarSectionStyles from './SidebarSection.css';
import SidebarSectionItem from './SidebarSectionItem';

export default class SidebarSection extends Component {

  constructor() {
    super();
    this._renderItem = this._renderItem.bind(this);
  }

  render() {
    return (
      <div className={SidebarSectionStyles.__container}>
        <div className={SidebarSectionStyles.__title_container}>
          {this.props.title}
        </div>
        <div className={SidebarSectionStyles.__items_container}>
          {
            this.props.items.map(this._renderItem)
          }
        </div>
      </div>
    );
  }

  _renderItem(item, i) {
    return (
      <SidebarSectionItem
        key={`SidebarSection_item_${i}`}
        index={i}
        item={item}
        onItemSelect={this.props.onItemSelect} />
    );
  }

}

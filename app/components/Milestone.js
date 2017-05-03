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
    this._renderPagination = this._renderPagination.bind(this);
    this._changePage = this._changePage.bind(this);
    this.state = {
      issues: [],
      page: 1
    }
  }

  componentDidMount() {
    this.setState({milestone:this.props.milestone, issues:[], lastPage:-1}, this._getIssues);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({milestone:nextProps.milestone, issues:[], lastPage:-1}, this._getIssues);
  }

  _getIssues() {
    this.props.repo.issues({
      milestone: this.state.milestone.number,
      state: 'all',
      page: this.state.page
    }, this._issuesReceived);
  }

  _issuesReceived(error, issues, headers) {
    const lastPage = this._loadLastPage(headers);
    this.setState({issues, headers, lastPage});
  }

  _loadLastPage(headers) {
    let lastPage = this.state.lastPage;
    let links = headers.link.split(',');
    links.forEach(function(link) {
      const [url, rel] = link.split(';').map(function(linkPart) {
        return linkPart
          .replace('rel="', '')
          .replace(/[<>"]/g, '')
          .trim();
      });
      if (rel === 'last') {
        lastPage = parseInt(url.replace(/.*page=(\d+).*/g, '$1'), 10);
      }
    });

    return lastPage;
  }

  render() {
    return (
      <div className={MilestoneStyles.__container}>
        <h1 className={MilestoneStyles.__title}>
          {this.props.milestone.title}
          <span className={MilestoneStyles.__title_details}>
            {this.props.milestone.open_issues} open issues
            {this.props.milestone.closed_issues > 0 &&
              <span>, {this.props.milestone.closed_issues} closed.</span>
            }
          </span>
        </h1>
        <div className={MilestoneStyles.__issues_container}>
          {
            this.state.issues.map(this._renderIssue)
          }
        </div>
        <div className={MilestoneStyles.__pagination_container}>
          {this._renderPagination()}
        </div>
      </div>
    );
  }

  _renderIssue(issue, index) {
    return (
      <Issue issue={issue} index={index} key={issue.id}/>
    )
  }

  _renderPagination() {
    if (!this.state.headers) {
      return;
    }

    let buttons = [];
    for (let i = 1; i <= this.state.lastPage; i++) {
      buttons.push(this._getPaginationButton(i));
    }
    buttons.unshift(this._getPaginationButton(this.state.page - 1, 'Previous'));
    buttons.push(   this._getPaginationButton(this.state.page + 1, 'Next'));
    return buttons;
  }

  _getPaginationButton(page, text) {
    let options = {
      className: [
        MilestoneStyles.__pagination_button
      ]
    };

    if (text !== undefined) {
      options.className.push(MilestoneStyles.__pagination_button_text);
    } else {
      text = page;
    }

    if (page === this.state.page) {
      options.className.push(MilestoneStyles.__pagination_button_current);
    }
    if (page > 0 && page <= this.state.lastPage) {
      options.onClick = this._changePage;
    } else {
      options.className.push(MilestoneStyles.__pagination_button_disabled);
      options.disabled = true;
    }
    options.className = options.className.join(' ');
    options.key = `button-${page}-${text}`;
    return (
      <button {...options} data-page={page}>
        {text}
      </button>
    );
  }

  _changePage(e) {
    e.target.blur();
    var page = parseInt(e.target.getAttribute('data-page'), 10);
    this.setState({issues:[], page}, this._getIssues);
  }


}

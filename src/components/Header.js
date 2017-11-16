import _ from 'lodash';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class Header extends Component {
  componentDidMount() {
    if (!this.props.categories) {
    } else {
      this.props.fetchCategories();
    }
  }

  renderCategories() {
    if(this.props.categories.categories) {
      return _.map(this.props.categories.categories, category => (
        <span key={category.path}>
          {console.log(category.path)}
        <Link
          className="nav-item nav-link active"
          to={`/${category.path}`}
        >
          {category.name}&nbsp;
        </Link>
        </span>
      ))
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">Readable</a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="/">Home</a>
              {this.renderCategories()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(categories) {
  return { categories }
}

export default connect(mapStateToProps, { fetchCategories })(Header);

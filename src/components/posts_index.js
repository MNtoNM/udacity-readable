import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { postVoteIncrement, postVoteDecrement, deletePost, fetchCategories } from '../actions';


class PostsIndex extends Component {

state = {
  sortBy: 'createdAt'
}

  componentDidMount() {

    if (!this.props.posts.length || !this.props.categories.length) {
      this.props.fetchPosts();
      this.props.fetchCategories();
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id, (callback) => {
      // Do Nothing
    });
  }

  renderCategories() {
    return _.map(this.props.categories, category => (
      <span key={category.name}>
        <Link to={`/${category.name}`}>
          {category.name}&nbsp;
        </Link>
      </span>
    ))
  }

  renderPosts() {

    const sortedPosts = _.orderBy(this.props.posts, [this.state.sortBy], ['desc'])

    return _.map(sortedPosts, post => {
      if ((!post) || (post === undefined)) {
        return <div>Loading...</div>;
      }

      if (this.props.location.pathname.includes(post.category) || this.props.location.pathname === '/') {
        return (
          <li className="list-group-item" key={post.id}>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <Link to={`/${post.category}/${post.id}`}>
                    {post.title}
                  </Link>
                </div>
                <div className="col-md-1">
                  <Link to={`/${post.category}`}>
                    {post.category}
                  </Link>

                </div>
                <div className="col-md-2">
                  {post.author}
                </div>
                <div className="col-md-1">
                  <i
                    className="fa fa-comments"
                    aria-hidden="true"
                    onClick={() => {

                    }}
                    >
                    <span>&nbsp;{ post.commentCount}</span>
                  </i> &nbsp; &nbsp;

                </div>
                <div className="col-md-2">
                  <i
                    className="fa fa-thumbs-up"
                    aria-hidden="true"
                    onClick={() => {
                      this.props.postVoteIncrement(post);
                    }}
                    >
                    &nbsp;&nbsp;
                  </i>
                  {post.voteScore}&nbsp;&nbsp;
                  <i
                    className="fa fa-thumbs-down"
                    aria-hidden="true"
                    onClick={() => {
                      this.props.postVoteDecrement(post);
                    }}
                  >
                  </i>
                </div>
                <div className="col-md-2">
                  <Link to={`/posts/${post.id}/edit`} >
                    <i
                      className="fa fa-edit"
                      aria-hidden="true"
                      onClick={() => {
                        // this.props.postVoteDecrement(post);
                      }}
                    >
                    </i>
                  </Link>
                  &nbsp; &nbsp;
                  &nbsp; &nbsp;
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => {
                      this.onDeleteClick(post.id);
                    }}
                  >
                  </i>
                </div>
              </div>
          </div>
        </li>
      );

      } else {
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h3>Posts</h3>
            </div>

            <div className="col-md-3">
              <span className="right">
                <span
                  onClick={() => {
                    this.setState({ sortBy: 'createdAt'});
                 }}>
                  By Date
                </span> |
                <span
                  onClick={() => {
                    this.setState({ sortBy: 'voteScore'});
                  }}>
                  &nbsp;By Popularity</span>
              </span>
            </div>
          </div>
        </div>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link className="btn btn-primary" to="/posts/new">
                Add a Post
              </Link>
            </div>
            <div className="col-md-9 categories">
              <strong>Categories:</strong>&nbsp;
              <span>
                {this.renderCategories()}
                <Link to='/'>View All Posts</Link>
              </span>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postVoteIncrement,
        postVoteDecrement,
        fetchPosts,
        deletePost,
        fetchCategories,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);

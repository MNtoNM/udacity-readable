import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {


  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      if (!post) {
        return <div>Loading...</div>;
      }
      return (
        <li className="list-group-item" key={post.id}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Link to={`/posts/${post.id}`}>
                  {post.title}
                </Link>
              </div>
              <div className="col-md-2">
                {post.category}
              </div>
              <div className="col-md-2">
                {post.author}
              </div>
              <div className="col-md-2">
              <i className="fa fa-thumbs-up" aria-hidden="true">&nbsp;&nbsp;</i>
                {post.voteScore}&nbsp;&nbsp;
              <i className="fa fa-thumbs-down" aria-hidden="true"></i>
              </div>
              <div className="col-md-2">
                <Link to={`/posts/${post.id}/edit`} >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
          Add a Post
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

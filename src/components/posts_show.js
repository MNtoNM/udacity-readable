import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    // this.props.match.params.id: React Router grabs 'id' from url
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    if(!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
        Delete Post
        </button>
        <div className="post-container">
          <h1>{post.title}</h1>
          <p>{post.body}</p>

          <h6><em>Posted in: {post.category}</em></h6>
        </div>
        <div className="comments">
          <div className="post-container">
            <hr />
            <h3>Discussion</h3>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

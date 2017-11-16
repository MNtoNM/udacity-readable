import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost, fetchComments } from '../actions';
import Comment from './Comment';
import CommentForm from './comment_form';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchComments(id);
    this.props.fetchPost(id);
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  renderComments = () => {
    return _.map(this.props.comments, comment => {
      const { id, body, author, voteScore} = comment;
      return (
        <li
          className="list-group-item"
          key={id}
        >
          <Comment
            id={id}
            body={body}
            author={author}
            voteScore={voteScore}
            parentId={this.props.post.id}
          />
        </li>
      );
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
        <Link to={`/posts/${post.id}/edit`}>
          <span className="btn btn-primary">Edit Post</span>
        </Link>
        <center>
          <div className="post-container">
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            <h6><em>Posted in: {post.category}</em></h6>
          </div>

          <div className="comments">
            <div className="post-container">
              <hr />
              <h3>Discussion</h3>
              Comments: {_.size(this.props.comments)}<br />
              Post Vote Score: {post.voteScore }
              <ul className="list-group">
                { this.renderComments() }
                <CommentForm parentId={post.id}/>
              </ul>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    comments
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost, fetchComments })(PostsShow);

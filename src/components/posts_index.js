import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { postVoteIncrement, postVoteDecrement, deletePost } from '../actions';


class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  onDeleteClick(id) {
    this.props.deletePost(id, (callback) => {
      // Do Nothing
    });
  }
  renderPosts() {
    console.log("PATH:", this.props.location.pathname);
    return _.map(this.props.posts, post => {
      // console.log("Post Category: ", post.category);
      console.log("Is there a post?: ", post)
      if ((!post) || (post === undefined)) {
        console.log("Post is undefined!!!");
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
                  </i> &nbsp; &nbsp;
                  {post.commentCount}
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
        console.log(`${post.category} not included!`);
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
              <span className="right">By Date | By Popularity</span>
            </div>
          </div>
        </div>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <div>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postVoteIncrement,
        postVoteDecrement,
        fetchPosts,
        deletePost
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { commentVoteIncrement, commentVoteDecrement, deleteComment, fetchComment, updateComment } from '../actions';
import { connect } from 'react-redux';

class Comment extends Component {
  state = {
    display: 'comment',
    commentBody: ''
  }
  componentDidMount() {
    // if this.state.display === 'edit', fetch comment body via api
  }

  onDeleteCommentClick(id) {
    this.props.deleteComment(id, (callback) => {
      // Do Nothing
    });
  }

  modifyComment(text) {
    console.log("Comment field: ", text)
    this.setState({ commentBody: text })
  }

  render() {
    {this.state.display === 'comment' ? console.log('comment') : console.log('not comment')}

    if (this.state.display === 'comment') {
      console.log("THIS.PROPS.ID: ", this.props.id);
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p>{this.props.body}</p>
            </div>
            <div className="col-md-3">
              <p>{this.props.author}</p>
            </div>
            <div className="col-md-2">
              <i
                className="fa fa-thumbs-up"
                aria-hidden="true"
                onClick={() => {
                  console.log("Props from inside Comment.js: ", this.props)
                  this.props.commentVoteIncrement(this.props.id);
                }}
              >
              &nbsp;&nbsp;
              </i>
              {this.props.voteScore}&nbsp;&nbsp;
              <i
                className="fa fa-thumbs-down"
                aria-hidden="true"
                onClick={() => {
                  console.log("Props from inside Comment.js: ", this.props)
                  this.props.commentVoteDecrement(this.props.id);
                }}
              >
              </i>
            </div>
            <div className="col-md-1">
              <i
                className="fa fa-edit"
                aria-hidden="true"
                onClick={() => {
                  console.log("THIS.PROPS from Comment edit btn: ", this.props);
                  this.props.fetchComment(this.props.id);
                  this.setState({ display: 'edit', commentBody: this.props.body });
                }}
              >
              </i>
              &nbsp; &nbsp;
              &nbsp; &nbsp;
            </div>
            <div className="col-md-1">
              <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={() => {
                  console.log("Props from inside Comment.js: ", this.props)
                  this.onDeleteCommentClick(this.props.id);
              }}
              >
              </i>
              &nbsp; &nbsp;
              &nbsp; &nbsp;
            </div>
          </div>
        </div>
      )

    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-9">
            <input
              onChange={(event) => {
                this.modifyComment(event.target.value)}
              }
              className="form-control"
              value={this.state.commentBody}
            />
            </div>
            <div className="col-md-1">
            <button
              className="btn btn-success"
              onClick={() => {
                console.log("FIND COMMENT ID: ", this.props.id);
                this.props.updateComment(this.props.id, this.state.commentBody)
                this.setState({ display: 'comment'})
              }}
              >
              Submit
            </button>
            </div>
            <div className="col-md-1">
            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({ display: 'comment'});
              }}
              >
              Cancel
            </button>
            </div>
          </div>
        </div>
      )
    }
  }
}


export default connect(null, { commentVoteIncrement, commentVoteDecrement, deleteComment, fetchComment, updateComment })(Comment);

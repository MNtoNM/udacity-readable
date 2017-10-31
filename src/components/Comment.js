import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { commentVoteIncrement, commentVoteDecrement, deleteComment } from '../actions';
import { connect } from 'react-redux';

class Comment extends Component {

  onDeleteCommentClick(id) {
    this.props.deleteComment(id, (callback) => {
      // Do Nothing
    });
  }

  render() {
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
  }
}


export default connect(null, { commentVoteIncrement, commentVoteDecrement, deleteComment })(Comment);

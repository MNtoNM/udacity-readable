
import React, { Component } from 'react';
import { createComment } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class CommentForm extends Component {
  onSubmit(values) {
    this.props.createComment(values, this.props.parentId);
  }

  renderBody(field) {
    console.log("field from renderBody: ", field)
    return (
      <div>
        <input className="form-control"
          type="text"
          placeholder="Comment..."
          className="form-control"
          {...field.input}
        />
      </div>
    );
  }

  renderAuthor(field) {
    return (
      <div>
        <input className="form-control"
          type="text"
          placeholder="Author"
          className="form-control"
          {...field.input}
          />
      </div>
    );
  }


  render() {
    return (
      <div className="list-group-item container">
        <div className="row">
          <div className="col-md-10">
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
              className="form-group">
              <Field name="body" component={this.renderBody} />
              <Field name="author" component={this.renderAuthor} />
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  >
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'CommentsNewForm'
})(
  connect(null, { createComment })(CommentForm)
);

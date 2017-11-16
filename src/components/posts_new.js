import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, updatePost, fetchPost } from '../actions';

class PostsNew extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }
  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        ></input>
      </div>
    );
  }

  onSubmit(values) {
    if (!this.props.match.params.id) {
      return this.props.createPost(values, () => {
        this.props.history.push('/');
      });
    }
    this.props.updatePost({ ...values, id: this.props.initialValues.id }, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="post-container">
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Category"
          name="category"
          component={this.renderField}
        />
        <Field
          label="Author"
          name="author"
          component={this.renderField}
        />
        <Field
          label="Body"
          name="body"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { initialValues: posts[ownProps.match.params.id] }
}

const InitializedFromStateForm = reduxForm({
  form: 'PostsNewForm'
})(PostsNew);

export default connect(mapStateToProps, { createPost, updatePost, fetchPost })(InitializedFromStateForm);

import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, fetchPost } from '../actions';

class PostsNew extends Component {
  componentDidMount() {
    console.log("post.id from URL: ", this.props.match.params.id);
    if (this.props.match.params.id) {
      this.props.fetchPost(this.props.match.params.id)
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className=`form group ${touched && error ? 'has-danger': "" }`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        ></input>
        {touched ? error : ""}
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit, post } = this.props;
    const title = post && post.title;
    const category = post && post.category;
    const author = post && post.author;
    const body = post && post.body;
    console.log("Postfields: ", title, category, author, body)
    return (
      <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          value={title}
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

function validate(values) {
  const errors = {};

  if(!values.title || values.title.length < 3) {
    errors.title = "Enter a title (longer than 3 characters)"
  }

  if (!values.categories) {
    errors.categories = "Enter some Categories."
  }

  if (!values.content) {
    errors.content = "Enter some content."
  }

  if (!values.body) {
    errors.body = "Enter some post content."
  }

  return errors;
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, { createPost, fetchPost })(PostsNew)
);

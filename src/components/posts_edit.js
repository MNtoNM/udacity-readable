import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsEdit extends Component {
  render() {
    return (
      <div>Edit a post here</div>
    )
  }
}

export default PostsEdit;

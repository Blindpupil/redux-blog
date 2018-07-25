import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class NewPost extends Component {
  renderField(field) {
    const {meta : {touched, error}} = field;
    const fieldClass = `form-control ${touched && error ? 'is-invalid' : ''}`;

    let htmlTag;
    if (field.tag === 'textarea') {
      htmlTag = <textarea className={fieldClass} {...field.input} />;
    } else {
      htmlTag = <input className={fieldClass} type="text" {...field.input} />;
    }

    return (
      <div className="form-group">
        <label>{field.label}</label>
        {htmlTag}
        <small className="form-text text-danger">
          {touched ? error : ''}
        </small>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Post title" name="title" component={this.renderField} />
        <Field label="Categories" name="categories" component={this.renderField} />
        <Field label="Content" name="content" tag="textarea" component={this.renderField} />
        <button className="btn btn-primary" type="submit">Submit</button>
        <Link to="/" className="btn btn-secondary ml-2"> Cancel </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate inputs from values
  if (!values.title) {
    errors.title = 'Please enter a title for your post';
  }

  if (!values.content) {
    errors.content = 'Add some content!';
  }
  // if errors is empty, the form is good for submission
  return errors;
}

export default reduxForm({
  validate,
  // this is the name of the form. Helps us handle multiple forms later.
  form: 'PostNewForm'
})(
  connect(null, { createPost })
  (NewPost)
);
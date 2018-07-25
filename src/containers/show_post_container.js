import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class ShowPost extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchSinglePost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // Remember, without this conditional, this.props.post returns undefined...
    if (!this.props.post) return <small>Loading...</small>;

    const {post} = this.props;
    return (
      <div>
        <Link to="/"> Back </Link>
        <button onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger float-right">
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h5>Categories: {post.categories}</h5>
        <p>{post.content}</p>
      </div>
    )
  }
}

// with this return our component only receives the single post we care about.
// We can move this mapStateToProps to a different file and have the component
// only render the html.
function mapStateToProps({posts}, ownProps) {
  // ownProps is the props object that goes to this component
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchSinglePost, deletePost})(ShowPost);
import React, { Component } from 'react';
import { connect  } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPost() {
    // returns an array, which is what React expects
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      )
    });
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPost()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(PostList);
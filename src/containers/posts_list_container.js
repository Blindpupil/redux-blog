import _ from 'lodash';
import React, { Component } from 'react';
import { connect  } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPost() {
    // returns an array, which is what React expects
    return _.map(this.props.posts, post => {
      return (
        <Link key={post.id} to={`/posts/${post.id}`} className="list-group-item list-group-item-action">
          {post.title}
        </Link>
      )
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Create post
          </Link>
        </div>
        <h3 className="mt-2">Posts</h3>
        <div className="list-group">
          {this.renderPost()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(PostList);
import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copyright: '',
      description: '',
      duration: '',
      end_user: '',
      title: '',
      url: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('resources').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const resource = doc.data();
        this.setState({
          key: doc.id,
          title: resource.title,
          description: resource.description,
          duration: resource.duraction,
          end_user: resource.end_user,
          copyright: resource.copyright,
          url: resource.url
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({resource:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { copyright, description, duration, end_user, title, url } = this.state;

    const updateRef = firebase.firestore().collection('resources').doc(this.state.key);
    updateRef.set({
      copyright, 
      description, 
      duration, 
      end_user, 
      title, 
      url
    }).then((docRef) => {
      this.setState({
        key: '',
        copyright: '',
        description: '',
        duration: '',
        end_user: '',
        title: '',
        url: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT resource
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">resource List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

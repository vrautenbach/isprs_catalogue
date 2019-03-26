import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('resources');
    this.state = {
      copyright: '',
      description: '',
      duration: '',
      end_user: '',
      title: '',
      url: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { copyright, description, duration, end_user, title, url } = this.state;

    this.ref.add({
      copyright, 
      description, 
      duration, 
      end_user, 
      title, 
      url
    }).then((docRef) => {
      this.setState({
        copyright: '',
        description: '',
        duration: '',
        end_user: '',
        title: '',
        url: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { copyright, description, duration, end_user, title, url } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD RESOURCE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Resource List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Duration:</label>
                <input type="text" class="form-control" name="duration" value={duration} onChange={this.onChange} placeholder="Duration in hours" />
              </div>
              <div class="form-group">
                <label for="end_user">End user:</label>
                <select class="form-control" name="end_user" value={end_user} onChange={this.onChange} placeholder="Intended end user">
                  <option value="teacher">teacher</option>
                  <option value="author">author</option>
                  <option value="learner">learner</option>
                  <option value="manager">manager</option>
                </select>
              </div>
              <div class="form-group">
                <label for="copyright">Copyright:</label>
                <select class="form-control" name="copyright" value={end_user} onChange={this.onChange} placeholder="Copyright">
                  <option value="0">no</option>
                  <option value="1">yes</option>
                </select>
              </div>
              <div class="form-group">
                <label for="url">URL:</label>
                <input type="text" class="form-control" name="url" value={url} onChange={this.onChange} placeholder="Link to the resource" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

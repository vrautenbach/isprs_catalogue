import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('resources');
    this.unsubscribe = null;
    this.state = {
      resources: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const resources = [];
    querySnapshot.forEach((doc) => {
      const { copyright, description, duration, end_user, title, url } = doc.data();
      resources.push({
        key: doc.id,
        doc, // DocumentSnapshot
        copyright, 
        description, 
        duration, 
        end_user, 
        title, 
        url,
      });
    });
    this.setState({
      resources
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              RESOURCE LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" className="btn btn-primary">Add Resource</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>End user</th>
                  <th>Copyright</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {this.state.resources.map(resource =>{
                  console.log(resource)
                return(  
                <>
                  <tr>
                    <td><Link to={`/show/${resource.key}`}>{resource.title}</Link></td>
                    <td>{resource.description}</td>
                    <td>{resource.duration}</td>
                    <td>{resource.end_user}</td>
                    <td>{resource.copyright}</td>
                    <td>{resource.url}</td>
                  </tr>
                  </>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

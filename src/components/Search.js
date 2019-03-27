import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';

class Search extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('resources');
    this.unsubscribe = null;
    this.state = {
      resources: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    /*const resources = [];
    querySnapshot.forEach((doc) => {
      const { title, description, date, author, lang } = doc.data();
      resources.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title, 
        description, 
        date, 
        author, 
        lang,
      });
    });
    this.setState({
      resources
   });*/
   console.log(this.props.match.params.id);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
        <div >
            <h3 >
              RESOURCE LIST
            </h3>
          </div>
      /*<div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              RESOURCE LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/create" className="btn btn-primary">Add Resource</Link>
              &emsp;
              <Link to="/create" className="btn btn-primary">Search</Link>
            </h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Authors</th>
                  <th>Language</th>
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
                    <td>{resource.date}</td>
                    <td>{resource.author}</td>
                    <td>{resource.lang}</td>
                  </tr>
                  </>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>*/
    );
  }
}

export default Search;

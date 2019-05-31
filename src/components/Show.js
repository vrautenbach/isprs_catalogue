/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import '../App.css';
import logo from '../animated_logo0_small.gif';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {},
      key: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('resources').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          resource: doc.data(),
          key: doc.id,
          // isLoading: false,
        });
      } else {
        console.log('No such document!');
      }
    });
  }

  delete(id) {
    firebase.firestore().collection('resources').doc(id).delete()
      .then(() => {
        console.log('Document successfully deleted!');
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <div className="container">
        <div className="panel panel-default">

          <div className="panel-heading">
            <div className="flex-row">
              <div className="flex-panel">
                <Link to="/"><img src={logo} alt="ISPRS Logo" /></Link>
              </div>
              <div className="flex-large">
                <h3 className="panel-title">
                  CATALOGUE FOR GEOSPATIAL EDUCATIONAL RESOURCES
                  <br />
                  <br />
                </h3>
              </div>
            </div>
          </div>

          <div className="panel-body">
            <br />
            <h4>{this.state.resource.title}</h4>
            <br />
            <table className="table table-stripe">
              <tr>
                <th>Description:</th>
                <td>{this.state.resource.description}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{this.state.resource.date}</td>
              </tr>
              <tr>
                <th>Language:</th>
                <td>{this.state.resource.lang}</td>
              </tr>
              <tr>
                <th>Authors:</th>
                <td>{this.state.resource.author}</td>
              </tr>
              <tr>
                <th>Keywords:</th>
                <td>{this.state.resource.keywords}</td>
              </tr>
              <tr>
                <th>Semantic density:</th>
                <td>{this.state.resource.semantic_density}</td>
              </tr>
              <tr>
                <th>Duration (in hours):</th>
                <td>{this.state.resource.duration}</td>
              </tr>
              <tr>
                <th>Learning resource type:</th>
                <td>{this.state.resource.resource_type}</td>
              </tr>
              <tr>
                <th>Interactivity type:</th>
                <td>{this.state.resource.interactivity_type}</td>
              </tr>
              <tr>
                <th>Interactivity level:</th>
                <td>{this.state.resource.interactivity_level}</td>
              </tr>
              <tr>
                <th>Context:</th>
                <td>{this.state.resource.context}</td>
              </tr>
              <tr>
                <th>Intended end user:</th>
                <td>{this.state.resource.end_user}</td>
              </tr>
              <tr>
                <th>Difficulty level:</th>
                <td>{this.state.resource.difficulty}</td>
              </tr>
              <tr>
                <th>Copyright:</th>
                <td>{this.state.resource.copyright}</td>
              </tr>
              <tr>
                <th>Cost:</th>
                <td>{this.state.resource.cost}</td>
              </tr>
              <tr>
                <th>Link to resource:</th>
                <td><a href={this.state.resource.url} rel="noopener noreferrer" target="_blank">{this.state.resource.url}</a></td>
              </tr>
            </table>
            <br />

            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
            &nbsp;
            <button type="button" onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default Show;

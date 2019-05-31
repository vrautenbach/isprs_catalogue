/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../Firebase';
import '../App.css';
import logo from '../animated_logo0_small.gif';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {},
      key: '',
      user: null,
    };

    // FireStore auth
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

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

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        });
      });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        // eslint-disable-next-line prefer-destructuring
        const user = result.user;
        this.setState({
          user,
        });
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
          {this.state.user ?
            <button className="btn btn-default btn-xs" onClick={this.logout}>Logout</button>
            :
            <button className="btn btn-default btn-xs" onClick={this.login}>Log In</button>
          }
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
                <th>Added by (username):</th>
                <td>{this.state.resource.displayName}</td>
              </tr>
              <tr>
                <th>Added by (email):</th>
                <td>{this.state.resource.email}</td>
              </tr>
              <tr>
                <th>Date added or updated:</th>
                <td>{this.state.resource.currdate}</td>
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
                <th>Duration:</th>
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
            {/* <button type="button" onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button> */}
          </div>
        </div>
        <br />
        <div class="footnote">
          <p>Funded by the 2018 ISPRS Scientific Initiatives. <br />
          Managed by the University of Pretoria. For any queries, email <a href="mailto:victoria.rautenbach@up.ac.za">victoria.rautenbach@up.ac.za</a></p>
        
        </div>
      </div>
    );
  }
}

export default Show;

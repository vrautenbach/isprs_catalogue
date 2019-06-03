/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import firebase, { auth, provider } from '../Firebase';
import '../App.css';
import help from './help.png';


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
            <button className="btn btn-primary btn-sm" onClick={this.logout}>Logout</button>              
            :
            <button className="btn btn-primary btn-sm" onClick={this.login}>Log In</button>              
          } 
          <div className="panel-body" style={{paddingTop: "10px"}}>
            <br />
            <h4>{this.state.resource.title}</h4>
            <br />
            <table className="table table-stripe">
              <tr>
                <th style={{width: '240px'}}>Description:</th>
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
                <th>Semantic density:<a data-tip data-for="semantic_density-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="semantic_density-tooltip" place="right" type="dark" effect="solid">
                  <span>The degree of conciseness (cutting out of unnecessary words while conveying an idea) of a learning object. This may be estimated in terms of its size, length of reading or in the case of media – the duration.</span>
                </ReactTooltip>
                </th>
                <td>{this.state.resource.semantic_density}</td>
              </tr>
              <tr>
                <th>Duration:</th>
                <td>{this.state.resource.duration}</td>
              </tr>
              <tr>
                <th>Learning resource type:<a data-tip data-for="resource_type-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="resource_type-tooltip" place="right" type="dark" effect="solid">
                  <span>Specific kind of learning object. Please select the most dominant kind.</span>
                </ReactTooltip>
                </th>
                <td>{this.state.resource.resource_type}</td>
              </tr>
              <tr>
                <th>Interactivity type:<a data-tip data-for="interactivity_type-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="interactivity_type-tooltip" place="right" type="dark" effect="solid">
                  <span><p>“Active” learning (e.g. learning by doing) is supported by the content that directly induces productive action by a learner. The active learning object prompts the learner for meaningful input or some other kind of productive action or decision. </p>
                  <p>“Expositive” learning (e.g. passive learning) occurs when the learner’s job mainly consists of absorbing the content exposed to them, generally through text, images or sound. </p>
                  <p>“Mixed” learning is when a learning object blends the active and expositive interactivity types. </p>
                  </span>
                </ReactTooltip>
                </th>
                <td>{this.state.resource.interactivity_type}</td>
              </tr>
              <tr>
                <th>Interactivity level:<a data-tip data-for="interactivity_level-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="interactivity_level-tooltip" place="right" type="dark" effect="solid">
                  <span>This refers to the degree to which the learner can influence the aspect or behavior of the resource.</span>
                </ReactTooltip>
                </th>
                <td>{this.state.resource.interactivity_level}</td>
              </tr>
              <tr>
                <th>Context:<a data-tip data-for="context-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="context-tooltip" place="right" type="dark" effect="solid">
                  <span>The principal or main environment within which the resource is intended to take place.</span>
                </ReactTooltip>
                </th>
                <td>{this.state.resource.context}</td>
              </tr>
              <tr>
                <th>Intended end user:<a data-tip data-for="end_user-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="end_user-tooltip" place="right" type="dark" effect="solid">
                  <span>Principal users for which this resource was designed, most dominant first.</span>
                </ReactTooltip>
                </th>
                <td>{this.state.resource.end_user}</td>
              </tr>
              <tr>
                <th>Difficulty level:<a data-tip data-for="difficulty-tooltip"> <img src={help} alt="Help" /></a>
                <ReactTooltip id="difficulty-tooltip" place="right" type="dark" effect="solid">
                  <span>How hard it is to work with or through the resource for the typical intended target audience.</span>
                </ReactTooltip>
                </th>
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
            <Link to={`/edit/${this.state.key}`} class="btn btn-success btn-sm">Edit</Link>
            {/* <button type="button" onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Show;

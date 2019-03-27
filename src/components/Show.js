/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

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
<h4><Link to="/">Resource List</Link></h4>
<h3 className="panel-title">
{this.state.resource.title}
</h3>
</div>
<div className="panel-body">
<dl>
<dt>Description:</dt>
<dd>{this.state.resource.description}</dd>
<dt>Date:</dt>
<dd>{this.state.resource.date}</dd>
<dt>Language:</dt>
<dd>{this.state.resource.lang}</dd>
<dt>Authors:</dt>
<dd>{this.state.resource.author}</dd>
<dt>Keywords:</dt>
<dd>{this.state.resource.keywords}</dd>
<dt>Semantic density:</dt>
<dd>{this.state.resource.semantic_density}</dd>
<dt>Duration (in hours):</dt>
<dd>{this.state.resource.duration}</dd>
<dt>Learning resource type:</dt>
<dd>{this.state.resource.resource_type}</dd>
<dt>Interactivity type:</dt>
<dd>{this.state.resource.interactivity_type}</dd>
<dt>Interactivity level:</dt>
<dd>{this.state.resource.interactivity_level}</dd>
<dt>Context:</dt>
<dd>{this.state.resource.context}</dd>
<dt>Intended end user:</dt>
<dd>{this.state.resource.end_user}</dd>
<dt>Difficulty level:</dt>
<dd>{this.state.resource.difficulty}</dd>
<dt>Copyright:</dt>
<dd>{this.state.resource.copyright}</dd>
<dt>Cost:</dt>
<dd>{this.state.resource.cost}</dd>
<dt>Link to resource:</dt>
<dd><a href={this.state.resource.url} rel="noopener noreferrer" target="_blank">{this.state.resource.url}</a></dd>
</dl>
<Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
&nbsp;
<button type="button" onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
</div>
</div>
</div>
    );
  }
}

export default Show;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

class Show extends Component {

	constructor(props) {
		super(props);
		this.state = {
			resource: {},
			key: ''
		};
	}

	componentDidMount() {
		const ref = firebase.firestore().collection('resources').doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				this.setState({
					resource: doc.data(),
					key: doc.id,
					isLoading: false
				});
			} else {
				console.log("No such document!");
			}
		});
	}

	delete(id){
		firebase.firestore().collection('resources').doc(id).delete().then(() => {
			console.log("Document successfully deleted!");
			this.props.history.push("/")
		}).catch((error) => {
			console.error("Error removing document: ", error);
		});
	}

	render() {
		return (
			<div class="container">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4><Link to="/">Resource List</Link></h4>
						<h3 class="panel-title">
							{this.state.resource.title}
						</h3>
					</div>
					<div class="panel-body">
						<dl>
							<dt>Description:</dt>
							<dd>{this.state.resource.description}</dd>
							<dt>Duration:</dt>
							<dd>{this.state.resource.duration}</dd>
							<dt>End user:</dt>
							<dd>{this.state.resource.end_user}</dd>
							<dt>Copyright:</dt>
							<dd>{this.state.resource.copyright}</dd>
							<dt>URL:</dt>
							<dd>{this.state.resource.url}</dd>
						</dl>
						<Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
						<button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Show;

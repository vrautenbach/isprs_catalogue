import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Search.css';
import firebase from '../Firebase';
import { render } from 'react-dom'
import Checkbox from './Checkbox'


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('resources');
    this.unsubscribe = null;
    this.state = {
      resources: [],
      search: '',
      checked: false
    }; 
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onCollectionUpdate = (querySnapshot) => {
    const resources = [];
    querySnapshot.forEach((doc) => {
      const { title, description, date, author, keywords, duration, resource_type, context } = doc.data();
      resources.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title, 
        description, 
        date, 
        author, 
        keywords,
        duration,
        resource_type,
        context
      });
    });
    this.setState({
      resources
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  //Checkbox code
  //state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })

    this.state.resources = this.state.resources.filter(function(results) {
        return results.resource_type.toLowerCase().match("exercise");
    });
  }

/*   handleCheckboxChangeExercise = event => {
    this.setState({ checked: event.target.checked })
    this.state.checked = true;
    this.setState(this.state);
  }
   */

  render() {
    let _resources = this.state.resources;
    let _search = this.state.search.trim().toLowerCase();

    if (_search.length > 0) {
      _resources = _resources.filter(function(results) 
      {
        if (results.description.toLowerCase().match(_search)) {
            return results.description.toLowerCase().match(_search);
        }
        else if (results.title.toLowerCase().match(_search)) {
            return results.title.toLowerCase().match(_search);
        }
        else if (results.keywords.toLowerCase().match(_search)) {
            return results.keywords.toLowerCase().match(_search);
        }
        else return ;
      });
    }

    return (
        <div className="container">
            <h1>Advance search</h1> <br/> <br/>
            <div className="flex-row">
                <div className="flex-panel">
                    <h5>FILTER</h5> <br/>
                    <div> 
                        <h6>Search:</h6>
                        <div class="input-group">
                            <input type="text" class="form-control" name="search" value={this.state.search} onChange={this.onChange} placeholder="Search in title, dexcription and keywords" />
                        </div>
                    </div> 
                    <br/>
                    <div> 
                        <h6>Learning resource type:</h6>

                        <label>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleCheckboxChange}
                            />
                            <span style={{ marginLeft: 8 }}>exercise</span>
                        </label>

                    </div>
                </div>
                <div className="flex-large">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                            RESOURCES <br/>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <table className="table table-stripe">
                            <thead>
                                <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Authors</th>
                                <th>Keywords</th>                                
                                <th>Duration (hours)</th>
                                <th>Learning Resource Type</th>
                                <th>Context</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_resources.map(resource =>{
                                // console.log(resource)
                                return(  
                                <>
                                <tr>
                                    <td><Link to={`/show/${resource.key}`}>{resource.title}</Link></td>
                                    <td>{resource.description}</td>
                                    <td>{resource.date}</td>
                                    <td>{resource.author}</td>
                                    <td>{resource.keywords}</td>
                                    <td>{resource.duration}</td>
                                    <td>{resource.resource_type}</td>
                                    <td>{resource.context}</td>
                                </tr>
                                </>
                                )})}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Search.css';
import firebase, { auth, provider } from '../Firebase';
import { render } from 'react-dom'
import Checkbox from "./Check.js";
//import Checkbox from './Checkbox'
import '../App.css';
import logo from '../animated_logo0_small.gif';
import config from '../common/config'


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('resources').orderBy('title');
    this.unsubscribe = null;
    this.state = {
      resources: [],
      search: '',
      checked: false,
      user: null,
      contextType:[],
      resourceType:[],
      endUser: [],
    };

    // FireStore auth
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onCollectionUpdate = (querySnapshot) => {
    const resources = [];
    querySnapshot.forEach((doc) => {
      const { title, description, date, author, keywords, duration, resource_type, context, end_user } = doc.data();
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
        context,
        end_user,
      });
    });
    this.setState({
      resources
   });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
    });
      
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  /*handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };*/

  /*handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    const checked = [];

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        //console.log(checkbox, "is selected.");
        checked.push(checkbox);
      });
      this.setState({
        checked
      });
  };*/

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  clickSelectedResourceType=(changeEvent)=>{
    const { name } = changeEvent.target;
    let filterArray = this.state.resourceType;
    //if in array remove else push
    if(filterArray.includes(name)){
      console.log("IN array")
      filterArray = filterArray.filter(element=>element!== name) 
    } else{
      filterArray.push(name)
    }

    this.setState({ resourceType:filterArray})
  }

  clickSelectedContextType=(changeEvent)=>{
    const { name } = changeEvent.target;
    let filterArray = this.state.contextType;
    //if in array remove else push
    if(filterArray.includes(name)){
      console.log("IN array")
      filterArray = filterArray.filter(element=>element!== name) 
    } else{
      filterArray.push(name)
    }

    this.setState({ contextType:filterArray})
  }

  clickSelectedEndUser=(changeEvent)=>{
    const { name } = changeEvent.target;
    let filterArray = this.state.endUser;
    //if in array remove else push
    if(filterArray.includes(name)){
      console.log("IN array")
      filterArray = filterArray.filter(element=>element!== name) 
    } else{
      filterArray.push(name)
    }

    this.setState({ endUser:filterArray})
  }


  render() {
   
    let _resources = this.state.resources;
    let _search = this.state.search.trim().toLowerCase();
    let _resourceType = this.state.resourceType;
    let _contextType = this.state.contextType;
    let _endUser = this.state.endUser;

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
        else return null;
      });
    }

    if (_contextType.length > 0) {
      _resources = _resources.filter((results)=> 
      {
        if (_contextType.includes(results.context)) { 
          return results.context;
        }
      });
    }

    if (_endUser.length > 0) {
      _resources = _resources.filter((results)=> 
      {
        if (_endUser.includes.apply(results.end_user)) { 
          return results.end_user;
        }
      });
    } 

    if (_resourceType.length > 0) {
      _resources = _resources.filter((results)=> 
      {
        if (_resourceType.includes(results.resource_type)) { 
          return results.resource_type;
        }
      });
    }

    return (
        <div className="container">
            <div class="panel-heading">
              {this.state.user ?
                <button className="btn btn-primary btn-sm" onClick={this.logout}>Logout</button>              
                :
                <button className="btn btn-primary btn-sm" onClick={this.login}>Log In</button>              
              }
              <div class="input-group">
                <input type="text" class="form-control" name="search" value={this.state.search} onChange={this.onChange} placeholder="Search for phrases in the title, description and keywords" />
              </div>
            </div>
            <div className="flex-row">
                <div className="flex-panel" style={{marginTop: '30px'}}>
                  <h6 style={{fontSize: '14px', marginBottom: '3px'}}>Context:</h6>
                      {config.contextType.map(checkbox=>(              
                      <Checkbox
                            label={checkbox}
                            isSelected={this.state.contextType.includes(checkbox)}
                            onCheckboxChange={(e)=> this.clickSelectedContextType(e)}
                            key={checkbox}
                          />)
                      )}
                  <h6 style={{fontSize: '14px', marginBottom: '3px', marginTop: '20px'}}>Learning resource type:</h6>
                      {config.resourceType.map(checkbox=>(              
                      <Checkbox
                            label={checkbox}
                            isSelected={this.state.resourceType.includes(checkbox)}
                            onCheckboxChange={(e)=> this.clickSelectedResourceType(e)}
                            key={checkbox}
                          />)
                      )}
                  <h6 style={{fontSize: '14px', marginBottom: '3px', marginTop: '20px'}}>End user:</h6>
                      {config.endUser.map(checkbox=>(              
                      <Checkbox
                            label={checkbox}
                            isSelected={this.state.endUser.includes(checkbox)}
                            onCheckboxChange={(e)=> this.clickSelectedEndUser(e)}
                            key={checkbox}
                          />)
                      )} 
                </div>
                <div class="panel panel-default" style={{height: '90vh', width:'70vw', overflow: 'scroll', marginTop: '30px',}}>
                      { _resources.length > 0
                      ?  
                        <div class="panel-body">
                          <h6 style={{textAlign: 'right'}}>{_resources.length} resources</h6>
                          <table className="table table-stripe">
                          <thead>
                              <tr>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Date</th>
                              <th>Keywords</th> 
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
                                  <td>{resource.keywords}</td>
                                  <td>{resource.resource_type}</td>
                                  <td>{resource.context}</td>
                              </tr>
                              </>
                              )})}
                          </tbody>
                          </table>
                        </div>
                        :
                        <h6 style={{paddingTop: '20px', textAlign: 'center'}}>No resources found.</h6>
                        }
                </div>
            </div>
        </div>
    );
  }
}

export default App;

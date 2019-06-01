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


const OPTIONS = ["diagram", "exam", "exercise", "experiment", "figure", "graph", "index", "lecture", "narrative text", "problem statement", "questionnaire", "self assessment", "simulation", "slide", "table"];

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('resources');
    this.unsubscribe = null;
    this.state = {
      resources: [],
      search: '',
      checked: false,
      user: null,
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      checked:[],
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

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
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
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    let _resources = this.state.resources;
    let _search = this.state.search.trim().toLowerCase();
    let _checked = this.state.checked;

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

    if (_checked.length > 0) {
      _resources = _resources.filter(function(results) 
      {
        if (_checked.includes(results.resource_type)) {
          console.log("helo");  
          return results.resource_type;
        }
      });
    }

    return (
        <div className="container">
            <div class="panel-heading">
                {this.state.user ?
                    <button className="btn btn-default btn-xs" onClick={this.logout}>Logout</button>              
                    :
                    <button className="btn btn-default btn-xs" onClick={this.login}>Log In</button>              
                }
                <div className="flex-row">
                    <div className="flex-panel">
                        <Link to="/"><img src={logo} alt="ISPRS Logo" /></Link>
                    </div>
                    <div className="flex-large">
                        <h3 class="panel-title">
                        CATALOGUE FOR GEOSPATIAL EDUCATIONAL RESOURCES <br/><br/>
                        </h3>
                    </div>
                </div>
                <div> 
                    <br/><br/>
                    <div class="input-group">
                        <input type="text" class="form-control" name="search" value={this.state.search} onChange={this.onChange} placeholder="Search for phrases in the title, description and keywords" />
                    </div>
                </div> 
            </div>
            <div className="flex-row">
                <div className="flex-panel">
                    <br/>
                        <form onSubmit={this.handleFormSubmit}>
                          <div className="form-group mt-2">
                            <button type="submit" className="btn btn-primary btn-sm">
                              Filter resources
                            </button>
                          </div>
                          <br/> 
                          <br/>
                          <br/> 
                          <h6>Learning resource type:</h6>
                          {this.createCheckboxes()}
                        </form>
                </div>
                <div className="flex-large">
                    <div class="panel panel-default">
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
            <br />
            <div class="footnote">
              <p>Funded by a 2018 <a href="https://www.isprs.org/society/si/default.aspx" rel="noopener noreferrer" target="_blank">ISPRS Scientific Initiatives</a> grant awarded to the ISPRS WG IV/9, ISPRS WG IV/6, ICA Commission on SDIs and Standards, and the Mongolian Geospatial Association. <br />
              Managed by the University of Pretoria. For any queries, email <a href="mailto:victoria.rautenbach@up.ac.za">victoria.rautenbach@up.ac.za</a></p>
            
            </div>
        </div>
    );
  }
}

export default App;

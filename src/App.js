import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase, { auth, provider } from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('resources');
    this.unsubscribe = null;
    this.state = {
      resources: [],
      search: '',
      user: null
    };
    
    //FireStore auth
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }

  onChange=(e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  logout=()=> {
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

  onCollectionUpdate = (querySnapshot) => {
    const resources = [];
    querySnapshot.forEach((doc) => {
      const { title, description, date, author, keywords } = doc.data();
      resources.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title, 
        description, 
        date, 
        author, 
        keywords,
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

  render() {
    let _resources = this.state.resources;
    let _search = this.state.search.trim().toLowerCase();

    //Search for keywords 
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
        else if (results.author.toLowerCase().match(_search)) {
          return results.author.toLowerCase().match(_search);
        }
        else return null;
      });
    }
    
    //Build the list
    return (
      <div class="container">
        <div class="panel panel-default" >
          {this.state.user ?
            <button className="btn btn-primary btn-sm" onClick={this.logout}>Logout</button>              
            :
            <button className="btn btn-primary btn-sm" onClick={this.login}>Log In</button>              
          } 
          <div class="panel-body">
            <h4>
              {this.state.user &&
                <Link to="/create" className="btn btn-primary btn-sm" >Add Resource</Link>      
              }
              <Link to="/search" className="btn btn-primary btn-sm" >Advance search</Link>
            </h4>
            <br></br>
            <div class="input-group">
              <input type="text" class="form-control" name="search" value={this.state.search} onChange={this.onChange} placeholder="Quick search" />
            </div>
            <br></br>
            <h6 style={{textAlign: 'right'}}>{_resources.length} resources</h6>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Authors</th>
                  <th>Keywords</th>
                </tr>
              </thead>
              <tbody>
                {_resources.map(resource =>{
                  //console.log(resource)
                return(  
                <>
                  <tr>
                    <td><Link to={`/show/${resource.key}`}>{resource.title}</Link></td>
                    <td>{resource.description}</td>
                    <td>{resource.date}</td>
                    <td>{resource.author}</td>
                    <td>{resource.keywords}</td>
                  </tr>
                  </>
                )})}
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default App;

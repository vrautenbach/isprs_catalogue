import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import firebase, { auth, provider } from '../Firebase';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../animated_logo0_small.gif';
import help from './help.png';
import ReactTooltip from 'react-tooltip'

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('resources');
    this.state = {
      title: '', 
      description: '', 
      date: '', 
      lang: '', 
      author: '', 
      keywords: '', 
      semantic_density: '', 
      duration: '', 
      resource_type: '', 
      interactivity_type: '', 
      interactivity_level: '', 
      context: '', 
      end_user: '', 
      difficulty: '', 
      copyright: '',
      cost: '', 
      url: '',
      currdate: '',
      user: null,
      displayName: '',
      email: '',
    };

    //FireStore auth
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        this.setState({
          user,
          displayName,
          email,
        });
      } 
    });
    
    var that = this;
    var ddate = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      //Setting the value of the date time
      currdate: ddate + '/' + month + '/' + year,
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          displayName: '',
          email: '',
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        const displayName = user.displayName;
        const email = user.email;
        this.setState({
          user,
          displayName,
          email,
        });
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, date, lang, author, keywords, semantic_density, duration, resource_type, interactivity_type, interactivity_level, context, end_user, difficulty, copyright, cost, url, currdate, displayName, email } = this.state;

    if ( (title.length < 2) && (description.length < 2) && (url.length < 2) ){
      alert('Please add a the title, description and link to the resource');
      return
    }

    this.ref.add({
      title, 
      description, 
      date, 
      lang, 
      author, 
      keywords, 
      semantic_density, 
      duration, 
      resource_type, 
      interactivity_type, 
      interactivity_level, 
      context, 
      end_user, 
      difficulty, 
      copyright,
      cost, 
      url, 
      currdate,
      displayName,
      email
    }).then((docRef) => {
      this.setState({
        title: '', 
        description: '', 
        date: '', 
        lang: '', 
        author: '', 
        keywords: '', 
        semantic_density: '', 
        duration: '', 
        resource_type: '', 
        interactivity_type: '', 
        interactivity_level: '', 
        context: '', 
        end_user: '', 
        difficulty: '', 
        copyright, 
        cost: '', 
        url: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, date, lang, author, keywords, semantic_density, duration, resource_type, interactivity_type, interactivity_level, context, end_user, difficulty, copyright, cost, url } = this.state;
    
    //var username = {this.state.user.displayName};
    //console.log(username);
    
    return (
      <div class="container">
        <div class="panel panel-default" >
          {this.state.user ?
            <button className="btn btn-primary btn-sm" onClick={this.logout}>Logout</button>              
            :
            <button className="btn btn-primary btn-sm" onClick={this.login}>Log In</button>              
          }
          <div class="panel-body" style={{paddingTop: '30px'}}>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title given to the resource (Required)" required />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Textual description of the content of the resource (Required)" cols="80" rows="3" required>{description}</textArea>
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="text" class="form-control" name="date" value={date} onChange={this.onChange} placeholder="Year the resource was created" />
              </div>
              <div class="form-group">
                <label for="lang">Language:</label>
                <select class="form-control" name="lang" value={lang} onChange={this.onChange} >
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="French">French</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="author">Authors:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author(s) of the resource" />
              </div>
              <div class="form-group">
                <label for="keywords">Keywords:</label>
                <input type="text" class="form-control" name="keywords" value={keywords} onChange={this.onChange} placeholder="A keyword(s) or phrase(s) describing the topic of the resource" />
              </div>
              <div class="form-group">
                <label for="semantic_density">Semantic density:</label>&nbsp;&nbsp;
                <a data-tip data-for="semantic_density-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="semantic_density-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span>The degree of conciseness (cutting out of unnecessary words while conveying an idea) of a learning object. This may be estimated in terms of its size, length of reading or in the case of media – the duration.</span>
                </ReactTooltip>
                <select class="form-control" name="semantic_density" value={semantic_density} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Very low">Very low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very high">Very high</option>
                </select>
              </div>
              <div class="form-group">
                <label for="duration">Duration:</label>
                <input type="text" class="form-control" name="duration" value={duration} onChange={this.onChange} placeholder="The time it takes to complete the reseource at the intended speed" />
              </div>
              <div class="form-group">
                <label for="resource_type">Resource type:</label>&nbsp;&nbsp;
                <a data-tip data-for="resource_type-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="resource_type-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span>Specific kind of learning object. Please select the most dominant kind.</span>
                </ReactTooltip>
                <select class="form-control" name="resource_type" value={resource_type} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Data">Data</option>
                  <option value="Diagram">Diagram</option>
                  <option value="Exam">Exam</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Experiment">Experiment</option>
                  <option value="Figure">Figure</option>
                  <option value="Graph">Graph</option>
                  <option value="Index">Index</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Model">Model</option>
                  <option value="Narrative text">Narrative text</option>
                  <option value="Problem statement">Problem statement</option>
                  <option value="Questionnaire">Questionnaire</option>
                  <option value="Self assessment">Self assessment</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Slide">Slide</option>
                  <option value="Software">Software</option>
                  <option value="Table">Table</option>
                </select>
              </div>
              <div class="form-group">
                <label for="interactivity_type">Interactivity type:</label>&nbsp;&nbsp;
                <a data-tip data-for="interactivity_type-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="interactivity_type-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span><p>“Active” learning (e.g. learning by doing) is supported by the content that directly induces productive action by a learner. The active learning object prompts the learner for meaningful input or some other kind of productive action or decision. </p>
                  <p>“Expositive” learning (e.g. passive learning) occurs when the learner’s job mainly consists of absorbing the content exposed to them, generally through text, images or sound. </p>
                  <p>“Mixed” learning is when a learning object blends the active and expositive interactivity types. </p></span>
                </ReactTooltip>
                <select class="form-control" name="interactivity_type" value={interactivity_type} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Active">Active</option>
                  <option value="Expositive">Expositive</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <div class="form-group">
                <label for="interactivity_level">Interactivity level:</label>&nbsp;&nbsp;
                <a data-tip data-for="interactivity_level-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="interactivity_level-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span>This refers to the degree to which the learner can influence the aspect or behavior of the resource.</span>
                </ReactTooltip>
                <select class="form-control" name="interactivity_level" value={interactivity_level} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Very low">Very low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very high">Very high</option>
                </select>
              </div>
              <div class="form-group">
                <label for="context">Context:</label>&nbsp;&nbsp;
                <a data-tip data-for="context-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="context-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span>The principal or main environment within which the resource is intended to take place.</span>
                </ReactTooltip>
                <select class="form-control" name="context" value={context} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Higher Education">Higher Education</option>
                  <option value="School">School</option>
                  <option value="Training">Training</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="end_user">End user:</label>&nbsp;&nbsp;
                <a data-tip data-for="end_user-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="end_user-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span>Principal users for which this resource was designed, most dominant first.</span>
                </ReactTooltip>
                <select class="form-control" name="end_user" value={end_user} onChange={this.onChange} placeholder="Intended end user">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Author">Author</option>
                  <option value="Learner">Learner</option>
                  <option value="Manager">Manager</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              <div class="form-group">
                <label for="difficulty">Difficulty:</label>&nbsp;&nbsp;
                <a data-tip data-for="difficulty-tooltip"><img src={help} alt="Help" /></a>
                <ReactTooltip id="difficulty-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                  <span>How hard it is to work with or through the resource for the typical intended target audience.</span>
                </ReactTooltip>
                <select class="form-control" name="difficulty" value={difficulty} onChange={this.onChange} placeholder="Intended end user">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="Very easy">Very easy</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficult">Difficult</option>
                  <option value="Very difficult">Very difficult</option>
                </select>
              </div>
              <div class="form-group">
                <label for="copyright">Copyright:</label>
                <select class="form-control" name="copyright" value={copyright} onChange={this.onChange} placeholder="Copyright">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div class="form-group">
                <label for="cost">Cost:</label>
                <input type="text" class="form-control" name="cost" value={cost} onChange={this.onChange} placeholder="Is there any cost required to use the resource?" />
              </div>
              <div class="form-group">
                <label for="url">URL:</label>
                <input type="text" class="form-control" name="url" value={url} onChange={this.onChange} placeholder="Link to the resource (Required)" required/>
              </div>
              {this.state.user ?
                <button type="submit" class="btn btn-success">Submit</button>               
                  :
                <button className="btn btn-default" onClick={this.login}>Please login to submit</button>              
              } 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

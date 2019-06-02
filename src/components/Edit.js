import React, { Component } from 'react';
import firebase, { auth, provider } from '../Firebase';
import { Link } from 'react-router-dom';
import '../App.css';
import help from './help.png';
import ReactTooltip from 'react-tooltip'

class Edit extends Component {

  constructor(props) {
    super(props);
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

    // FireStore auth
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
    
    const ref = firebase.firestore().collection('resources').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const resource = doc.data();
        this.setState({
          key: doc.id,
          title: resource.title,
          description: resource.description,
          date: resource.date,
          lang: resource.lang,
          author: resource.author,
          keywords: resource.keywords,
          semantic_density: resource.semantic_density,
          duration: resource.duration,
          resource_type: resource.resource_type,
          interactivity_type: resource.interactivity_type,
          interactivity_level: resource.interactivity_level,
          context: resource.context,
          end_user: resource.end_user,
          difficulty: resource.difficulty,
          copyright: resource.copyright,
          cost: resource.cost,
          url: resource.url
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({resource:state});
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

    const updateRef = firebase.firestore().collection('resources').doc(this.state.key);
    updateRef.set({
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
        key: '',
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
        url: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          {this.state.user ?
            <button className="btn btn-primary btn-sm" onClick={this.logout}>Logout</button>              
            :
            <button className="btn btn-primary btn-sm" onClick={this.login}>Log In</button>              
          }
          <div class="panel-body" style={{paddingTop: "10px"}}>
            {this.state.user ?
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} required/>
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} required/>
                  </div>
                  <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="text" class="form-control" name="date" value={this.state.date} onChange={this.onChange} />
                  </div>
                  <div class="form-group">
                    <label for="lang">Language:</label>
                    <select class="form-control" name="lang" value={this.state.lang} onChange={this.onChange} placeholder={this.state.lang}>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="French">French</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="author">Authors:</label>
                    <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} />
                  </div>
                  <div class="form-group">
                    <label for="keywords">Keywords:</label>
                    <input type="text" class="form-control" name="keywords" value={this.state.keywords} onChange={this.onChange} />
                  </div>
                  <div class="form-group">
                    <label for="semantic_density">Semantic density:</label>
                    <a data-tip data-for="semantic_density-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="semantic_density-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>The degree of conciseness (cutting out of unnecessary words while conveying an idea) of a learning object. This may be estimated in terms of its size, length of reading or in the case of media – the duration.</span>
                    </ReactTooltip>
                    <select class="form-control" name="semantic_density" value={this.state.semantic_density} onChange={this.onChange} placeholder={this.state.semantic_density}>
                      <option value="Very low">Very low</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very high">Very high</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="duration">Duration:</label>
                    <input type="text" class="form-control" name="duration" value={this.state.duration} onChange={this.onChange} placeholder="Duration in hours" />
                  </div>
                  <div class="form-group">
                    <label for="resource_type">Resource type:</label>
                    <a data-tip data-for="resource_type-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="resource_type-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>Specific kind of learning object. Please select the most dominant kind.</span>
                    </ReactTooltip>
                    <select class="form-control" name="resource_type" value={this.state.resource_type} onChange={this.onChange} placeholder="">
                      <option value="Diagram">Diagram</option>
                      <option value="Exam">Exam</option>
                      <option value="Exercise">Exercise</option>
                      <option value="Experiment">Experiment</option>
                      <option value="Figure">Figure</option>
                      <option value="Graph">Graph</option>
                      <option value="Index">Index</option>
                      <option value="Lecture">Lecture</option>
                      <option value="Narrative text">Narrative text</option>
                      <option value="Problem statement">Problem statement</option>
                      <option value="Questionnaire">Questionnaire</option>
                      <option value="Self assessment">Self assessment</option>
                      <option value="Simulation">Simulation</option>
                      <option value="Slide">Slide</option>
                      <option value="Table">Table</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="interactivity_type">Interactivity type:</label>
                    <a data-tip data-for="interactivity_type-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="interactivity_type-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span><p>“Active” learning (e.g. learning by doing) is supported by the content that directly induces productive action by a learner. The active learning object prompts the learner for meaningful input or some other kind of productive action or decision. </p>
                      <p>“Expositive” learning (e.g. passive learning) occurs when the learner’s job mainly consists of absorbing the content exposed to them, generally through text, images or sound. </p>
                      <p>“Mixed” learning is when a learning object blends the active and expositive interactivity types. </p></span>
                    </ReactTooltip>
                    <select class="form-control" name="interactivity_type" value={this.state.interactivity_type} onChange={this.onChange} placeholder="">
                      <option value="Active">Active</option>
                      <option value="Expositive">Expositive</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="interactivity_level">Interactivity level:</label>
                    <a data-tip data-for="interactivity_level-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="interactivity_level-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>This refers to the degree to which the learner can influence the aspect or behavior of the resource.</span>
                    </ReactTooltip>
                    <select class="form-control" name="interactivity_level" value={this.state.interactivity_level} onChange={this.onChange} placeholder="">
                      <option value="Very low">Very low</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very high">Very high</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="context">Context:</label>
                    <a data-tip data-for="context-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="context-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>The principal or main environment within which the resource is intended to take place.</span>
                    </ReactTooltip>
                    <select class="form-control" name="context" value={this.state.context} onChange={this.onChange} placeholder="">
                      <option value="School">School</option>
                      <option value="Higher Education">Higher Education</option>
                      <option value="Training">Training</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="end_user">End user:</label>
                    <a data-tip data-for="end_user-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="end_user-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>Principal users for which this resource was designed, most dominant first.</span>
                    </ReactTooltip>
                    <select class="form-control" name="end_user" value={this.state.end_user} onChange={this.onChange} placeholder="Intended end user">
                      <option value="Teacher">Teacher</option>
                      <option value="Author">Author</option>
                      <option value="Learner">Learner</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="difficulty">Difficulty:</label>
                    <a data-tip data-for="difficulty-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="difficulty-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>How hard it is to work with or through the resource for the typical intended target audience.</span>
                    </ReactTooltip>
                    <select class="form-control" name="difficulty" value={this.state.difficulty} onChange={this.onChange} placeholder="Intended end user">
                      <option value="Very easy">Very easy</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Difficult">Difficult</option>
                      <option value="Very difficult">Very difficult</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="copyright">Copyright:</label>
                    <select class="form-control" name="copyright" value={this.state.copyright} onChange={this.onChange} placeholder="Copyright">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="cost">Cost:</label>
                    <input type="text" class="form-control" name="cost" value={this.state.cost} onChange={this.onChange} placeholder="" />
                  </div>
                  <div class="form-group">
                    <label for="url">URL:</label>
                    <input type="text" class="form-control" name="url" value={this.state.url} onChange={this.onChange} placeholder="Link to the resource" required/>
                  </div>
                  <button type="submit" class="btn btn-success btn-sm">Submit</button>
                </form>
            :
              <div className='wrapper'>
                <p style={{textAlign: 'center', paddingTop: '100px'}}>You must be logged in to edit any resources.</p>
                {/* <button className="btn btn-link" onClick={this.login}>Click here to Log In</button> */}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

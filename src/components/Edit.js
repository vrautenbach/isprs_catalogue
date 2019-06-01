import React, { Component } from 'react';
import firebase, { auth, provider } from '../Firebase';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../animated_logo0_small.gif';
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
            <button className="btn btn-default btn-xs" onClick={this.logout}>Logout</button>              
            :
            <button className="btn btn-default btn-xs" onClick={this.login}>Log In</button>              
          }
          <div class="panel-heading">
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
          </div>

          <div class="panel-body">
            {this.state.user ?
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} />
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} />
                  </div>
                  <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="text" class="form-control" name="date" value={this.state.date} onChange={this.onChange} />
                  </div>
                  <div class="form-group">
                    <label for="lang">Language:</label>
                    <select class="form-control" name="lang" value={this.state.lang} onChange={this.onChange} placeholder={this.state.lang}>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="french">French</option>
                      <option value="other">Other</option>
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
                      <option value="very low">very low</option>
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                      <option value="very high">very high</option>
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
                      <option value="exercise">exercise</option>
                      <option value="simulation">simulation</option>
                      <option value="questionnaire">questionnaire</option>
                      <option value="diagram">madiagramager</option>
                      <option value="figure">figure</option>
                      <option value="graph">graph</option>
                      <option value="index">index</option>
                      <option value="slide">slide</option>
                      <option value="table">table</option>
                      <option value="narrative text">narrative text</option>
                      <option value="exam">exam</option>
                      <option value="experiment">experiment</option>
                      <option value="problem statement">problem statement</option>
                      <option value="self assessment">self assessment</option>
                      <option value="lecture">lecture</option>
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
                      <option value="active">active</option>
                      <option value="expositive">expositive</option>
                      <option value="mixed">mixed</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="interactivity_level">End user:</label>
                    <a data-tip data-for="interactivity_level-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="interactivity_level-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>This refers to the degree to which the learner can influence the aspect or behavior of the resource.</span>
                    </ReactTooltip>
                    <select class="form-control" name="interactivity_level" value={this.state.interactivity_level} onChange={this.onChange} placeholder="">
                      <option value="very low">very low</option>
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                      <option value="very high">very high</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="context">Context:</label>
                    <a data-tip data-for="context-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="context-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>The principal or main environment within which the resource is intended to take place.</span>
                    </ReactTooltip>
                    <select class="form-control" name="context" value={this.state.context} onChange={this.onChange} placeholder="">
                      <option value="school">school</option>
                      <option value="higher education">higher education</option>
                      <option value="training">training</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="end_user">End user:</label>
                    <a data-tip data-for="end_user-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="end_user-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>Principal users for which this resource was designed, most dominant first.</span>
                    </ReactTooltip>
                    <select class="form-control" name="end_user" value={this.state.end_user} onChange={this.onChange} placeholder="Intended end user">
                      <option value="teacher">teacher</option>
                      <option value="author">author</option>
                      <option value="learner">learner</option>
                      <option value="manager">manager</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="difficulty">Difficulty:</label>
                    <a data-tip data-for="difficulty-tooltip"> <img src={help} alt="Help" /></a>
                    <ReactTooltip id="difficulty-tooltip" place="right" type="dark" effect="solid" delayHide={300}>
                      <span>How hard it is to work with or through the resource for the typical intended target audience.</span>
                    </ReactTooltip>
                    <select class="form-control" name="difficulty" value={this.state.difficulty} onChange={this.onChange} placeholder="Intended end user">
                      <option value="very easy">very easy</option>
                      <option value="easy">easy</option>
                      <option value="medium">medium</option>
                      <option value="difficult">difficult</option>
                      <option value="very difficult">very difficult</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="copyright">Copyright:</label>
                    <select class="form-control" name="copyright" value={this.state.copyright} onChange={this.onChange} placeholder="Copyright">
                      <option value="no">no</option>
                      <option value="yes">yes</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="cost">Cost:</label>
                    <input type="text" class="form-control" name="cost" value={this.state.cost} onChange={this.onChange} placeholder="" />
                  </div>
                  <div class="form-group">
                    <label for="url">URL:</label>
                    <input type="text" class="form-control" name="url" value={this.state.url} onChange={this.onChange} placeholder="Link to the resource" />
                  </div>
                  <button type="submit" class="btn btn-success">Submit</button>
                </form>
            :
              <div className='wrapper'>
                <br />
                <br />
                <p>You must be logged in to edit any resources.</p>
                <button className="btn btn-link" onClick={this.login}>Click here to Log In</button>    
              </div>
            }
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

export default Edit;

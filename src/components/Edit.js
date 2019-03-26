import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

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
      url: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('resources').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const resource = doc.data();
        this.setState({
          key: doc.id,
          title: resource.title,
          description: resource.description,
          duration: resource.duraction,
          end_user: resource.end_user,
          copyright: resource.copyright,
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

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, date, lang, author, keywords, semantic_density, duration, resource_type, interactivity_type, interactivity_level, context, end_user, difficulty, copyright, cost, url } = this.state;

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
      url
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
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT resource
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">resource List</Link></h4>
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
                <select class="form-control" name="interactivity_type" value={this.state.interactivity_type} onChange={this.onChange} placeholder="">
                  <option value="active">active</option>
                  <option value="expositive">expositive</option>
                  <option value="mixed">mixed</option>
                </select>
              </div>
              <div class="form-group">
                <label for="interactivity_level">End user:</label>
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
                <select class="form-control" name="context" value={this.state.context} onChange={this.onChange} placeholder="">
                  <option value="school">school</option>
                  <option value="higher education">higher education</option>
                  <option value="training">training</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="end_user">End user:</label>
                <select class="form-control" name="end_user" value={this.state.end_user} onChange={this.onChange} placeholder="Intended end user">
                  <option value="teacher">teacher</option>
                  <option value="author">author</option>
                  <option value="learner">learner</option>
                  <option value="manager">manager</option>
                </select>
              </div>
              <div class="form-group">
                <label for="difficulty">Difficulty:</label>
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
                <select class="form-control" name="copyright" value={this.state.end_user} onChange={this.onChange} placeholder="Copyright">
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
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

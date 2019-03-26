import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

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
      url: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, date, lang, author, keywords, semantic_density, duration, resource_type, interactivity_type, interactivity_level, context, end_user, difficulty, copyright, cost, url } = this.state;

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
      url
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
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD RESOURCE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Resource List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="text" class="form-control" name="date" value={date} onChange={this.onChange} placeholder="Year the resources was created" />
              </div>
              <div class="form-group">
                <label for="lang">Language:</label>
                <select class="form-control" name="lang" value={lang} onChange={this.onChange} >
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="french">French</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="author">Authors:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="keywords">Keywords:</label>
                <input type="text" class="form-control" name="keywords" value={keywords} onChange={this.onChange} placeholder="Separate keywords with semicolon" />
              </div>
              <div class="form-group">
                <label for="semantic_density">Semantic density:</label>
                <select class="form-control" name="semantic_density" value={semantic_density} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="very low">very low</option>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                  <option value="very high">very high</option>
                </select>
              </div>
              <div class="form-group">
                <label for="duration">Duration:</label>
                <input type="text" class="form-control" name="duration" value={duration} onChange={this.onChange} placeholder="Duration in hours" />
              </div>
              <div class="form-group">
                <label for="resource_type">Resource type:</label>
                <select class="form-control" name="resource_type" value={resource_type} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="exercise">exercise</option>
                  <option value="simulation">simulation</option>
                  <option value="questionnaire">questionnaire</option>
                  <option value="diagram">diagram</option>
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
                <select class="form-control" name="interactivity_type" value={interactivity_type} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="active">active</option>
                  <option value="expositive">expositive</option>
                  <option value="mixed">mixed</option>
                </select>
              </div>
              <div class="form-group">
                <label for="interactivity_level">Interactivity level:</label>
                <select class="form-control" name="interactivity_level" value={interactivity_level} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="very low">very low</option>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                  <option value="very high">very high</option>
                </select>
              </div>
              <div class="form-group">
                <label for="context">Context:</label>
                <select class="form-control" name="context" value={context} onChange={this.onChange} placeholder="">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="school">school</option>
                  <option value="higher education">higher education</option>
                  <option value="training">training</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="end_user">End user:</label>
                <select class="form-control" name="end_user" value={end_user} onChange={this.onChange} placeholder="Intended end user">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="teacher">teacher</option>
                  <option value="author">author</option>
                  <option value="learner">learner</option>
                  <option value="manager">manager</option>
                </select>
              </div>
              <div class="form-group">
                <label for="difficulty">Difficulty:</label>
                <select class="form-control" name="difficulty" value={difficulty} onChange={this.onChange} placeholder="Intended end user">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="very easy">very easy</option>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="difficult">difficult</option>
                  <option value="very difficult">very difficult</option>
                </select>
              </div>
              <div class="form-group">
                <label for="copyright">Copyright:</label>
                <select class="form-control" name="copyright" value={end_user} onChange={this.onChange} placeholder="Copyright">
                  <option disabled selected value=""> -- select an option -- </option>
                  <option value="no">no</option>
                  <option value="yes">yes</option>
                </select>
              </div>
              <div class="form-group">
                <label for="cost">Cost:</label>
                <input type="text" class="form-control" name="cost" value={cost} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="url">URL:</label>
                <input type="text" class="form-control" name="url" value={url} onChange={this.onChange} placeholder="Link to the resource" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

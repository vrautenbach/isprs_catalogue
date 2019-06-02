/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import logo from './animated_logo0_small.gif';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Search from './components/Search';

ReactDOM.render(
  <Router>
    <div className="top">
      <div className="imagediv">
        <Link to="/"><img src={logo} alt="ISPRS Logo" /></Link>
      </div>
      <div className="titlediv">
        <h3 className="panel-title">
          CATALOGUE FOR GEOSPATIAL EDUCATIONAL RESOURCES
          <br />
          <br />
        </h3>
      </div>
    </div>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create" component={Create} />
      <Route path="/show/:id" component={Show} />
      <Route path="/search" component={Search} />
    </div>
    <div className="footnote">
      <p>
          Funded by a 2018
        {' '}
        <a href="https://www.isprs.org/society/si/default.aspx" rel="noopener noreferrer" target="_blank">ISPRS Scientific Initiatives</a>
        {' '}
          grant awarded to the ISPRS WG IV/9, ISPRS WG IV/6, ICA Commission on SDIs and Standards, and the Mongolian Geospatial Association.
        <br />
          Managed by the University of Pretoria. For any queries, email
        {' '}
        <a href="mailto:victoria.rautenbach@up.ac.za">victoria.rautenbach@up.ac.za</a>
      </p>
    </div>
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

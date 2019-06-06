import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

//pages 
import About from './components/pages/About';

import axios from 'axios';

import GithubState from './context/github/githubState'; 

import './App.css';
import { async } from 'q';

const App = () => {

  const [repos, setUserRepos] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [alert, setAlert] = useState(null); 

  /*
  the above, replaces this: 
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }
  */


  // Get a single Github user 
  const getUserRepos = async username => {
    setLoading(true); 

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    setUserRepos(res.data)
    setLoading(false); 
  }

  //setAlert
  const showAlert = (msg, type) => {
    setAlert({msg, type })

    setTimeout(() => setAlert(null), 5000)
  }

    return (
      <GithubState>
              <Router>
        <header className="App-header">
          <Navbar
            title="Github Finder"
            icon="fab fa-github"
          />
        </header>
        <div className="container">
          <Alert alert={alert} />

          <Switch>
            <Route
              exact path='/'
              render={props => (
                <Fragment>
                  <Search
                    setAlert={showAlert}
                  />
                  <Users />
                </Fragment>

              )}>
            </Route>
            <Route exact path='/about' component={About} />

            <Route exact path='/users/:login'
              render={props => (
                <User
                  {...props}
                 
                  getUserRepos={getUserRepos}
                  repos={repos}

                />
              )} />

          </Switch>


        </div>
      </Router>
      </GithubState>
    );
}

export default App;

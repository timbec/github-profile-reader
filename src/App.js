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
import './App.css';
import { async } from 'q';

const App = () => {

  const [users, setUsers] = useState([]); 
  const [user, setUser] = useState([]); 
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

 const allUsers = async text => {

    setLoading(true); 

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    setUsers(res.data.items);
    setLoading(false); 
  }

  //Search Github Users
  const searchUsers = async text => {

    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log(res.data);

    // this.setState({ users: res.data.items, loading: false });
    setUsers(res.data.items); 
    setLoading(false); 
  }

  // Get a single Github user 
  const getUser = async username => {
    
    setLoading(true); 

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log('user data: ' + res.data);

    setUser(res.data); 
    setLoading(false); 
  }

  // Get a single Github user 
  const getUserRepos = async username => {
    setLoading(true); 

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log('repos data: ' + res.data);

    setUserRepos(res.data)
    setLoading(false); 
  }

 


  // Clear users from state: 
  const clearUsers = () => { 
    setUsers([]); 
    setLoading(false); 
  };

  //setAlert
  const showAlert = (msg, type) => {
    setAlert({msg, type })

    setTimeout(() => setAlert(null), 5000)
  }

    return (
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
                    searchUsers={searchUsers} clearUsers={clearUsers}
                    showClear={
                      users.length > 0 ? true : false
                    }
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>

              )}>
            </Route>
            <Route exact path='/about' component={About} />

            <Route exact path='/users/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}

                />
              )} />

          </Switch>


        </div>
      </Router>
    );
}

export default App;

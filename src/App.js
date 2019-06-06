import React, { Component, Fragment } from 'react';
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

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  async componentDidMount() {

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    this.setState({ users: res.data, loading: false });
  }

  //Search Github Users
  searchUsers = async text => {

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log(res.data);

    this.setState({ users: res.data.items, loading: false });
  }

  // Get a single Github user 
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log('user data: ' + res.data);

    this.setState({ user: res.data, loading: false });
  }

  // Get a single Github user 
  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log('repos data: ' + res.data);

    this.setState({ repos: res.data, loading: false });
  }


  // Clear users from state: 
  clearUsers = () => this.setState({ users: [], loading: false });

  //setAlert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }))
  }

  render() {
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        <header className="App-header">
          <Navbar
            title="Github Finder"
            icon="fab fa-github"
          />
        </header>
        <div className="container">
          <Alert alert={this.state.alert} />

          <Switch>
            <Route
              exact path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                    showClear={
                      users.length > 0 ? true : false
                    }
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={this.state.users} />
                </Fragment>

              )}>
            </Route>
            <Route exact path='/about' component={About} />

            <Route exact path='/users/:login'
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
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
}

export default App;

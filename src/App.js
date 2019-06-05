import React, { Component, Fragment } from 'react';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search'; 

import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log(res.data);

    this.setState({ users: res.data, loading: false });
  }

  //Search Github Users
  searchUsers = async text => {

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);

    console.log(res.data);

    this.setState({ users: res.data.items, loading: false });
  }

  // Clear users from state: 
  clearUsers = () => this.setState({ users: [], loading: false }); 

  render() {
    const { users, loading} = this.state; 

    return (
      <Fragment>
        <header className="App-header">
          <Navbar
            title="Github Finder"
            icon="fab fa-github"
          />
        </header>
        <div className="container">
          <Search 
          searchUsers={this.searchUsers} clearUsers={this.clearUsers}
          showClear={
            users.length > 0 ? true : false
          }
           />
          <Users loading={loading} users={this.state.users} />
        </div>
      </Fragment>
    );
  }
}

export default App;

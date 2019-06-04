import React, {Component, Fragment} from 'react';
import Navbar from './components/layout/Navbar'; 
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="App-header">
          <Navbar 
          title="Github Finder"
          icon="fab fa-github"
           />
        </header>
      </Fragment>
    );
  }
}

export default App;

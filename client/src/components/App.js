import React, { Component } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Import components
import Header from './Header';
import Landing from './Landing';

// Dummy components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  // ------------------------ //
  //  Redux state changers    //
  // ------------------------ //
  componentDidMount() {
    this.props.fetchUser();
  }

  // ------------------------ //
  //  Render Main component   //
  // ------------------------ //
  render() {
    return (
      <div className='container'>
        <Routes>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </Routes>
      </div>
    );
  }
}

export default connect(null, actions)(App);

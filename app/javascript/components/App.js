import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import BeersIndexContainer from '../containers/BeersIndexContainer'

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/'>
      <IndexRoute component={BeersIndexContainer} />
        <Route path="beers" component={BeersIndexContainer} />
      </Route>
    </Router>
  )

}
export default App;

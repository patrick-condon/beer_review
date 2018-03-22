import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import BeersIndexContainer from '../containers/BeersIndexContainer'
import BeerShowContainer from '../containers/BeerShowContainer'
import BeerFormContainer from '../containers/BeerFormContainer'


const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={BeersIndexContainer} />
        <Route path="beers" component={BeersIndexContainer} />
        <Route path="beers/:id" component={BeerShowContainer} />
        <Route path="add_new_beer" component={BeerFormContainer} />
        <Route path="beers/:id/edit" component={BeerFormContainer} />
      </Route>
    </Router>
  )

}
export default App;

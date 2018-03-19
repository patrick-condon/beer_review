import React, { Component } from 'react';
import BeerTile from '../components/BeerTile';
import { Link } from 'react-router';

class BeersIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = { beers: [] }
  }

  componentDidMount() {
    fetch('/api/v1/beers.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ beers: body.beers });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));    
  }

  render() {
    let beers = this.state.beers.map(beer => {
      return (
        <BeerTile
          key={beer.id}
          id={beer.id}
          name={beer.beer_name}
          style={beer.beer_style}
        />
      )
    })
    return(
      <div>
        <h1>Beer Index Page</h1>
        {beers}
        <Link to={'add_new_beer'}>
          Add New Beer
        </Link>
      </div>
    )
  }
}
export default BeersIndexContainer;

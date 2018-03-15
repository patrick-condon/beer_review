import React, { Component } from 'react';
import BeerShow from '../components/BeerShow';


class BeerShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = { beer: {} }
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/beers/${id}.json`)
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
        this.setState({ beer: body.beer });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let description = "This is a beer.";
    let active;
    let label = "https://images.pexels.com/photos/8744/mug-glass-beer.jpg?w=940&h=650&auto=compress&cs=tinysrgb";
    if (this.state.beer.beer_active == 0) {
      active = 'Beer is not currently available'
    } else if (
      this.state.beer.beer_active == 1
    ) { active = 'Beer is available'
    } else { active = 'Availabilty Unknown' }
    if (this.state.beer.beer_description != null) {
      description = this.state.beer.beer_description
    }
    if (this.state.beer.beer_label != null) {
      label = this.state.beer.beer_label
    }

    return(
      <BeerShow
        key={this.state.beer.id}, beer_name={this.state.beer.beer_name}
        brewery_name={this.state.beer.brewery_name}
        beer_style={this.state.beer.beer_style}, beer_abv={this.state.beer.beer_abv}
        beer_description={description}, beer_active={active}, beer_label={label}
      />
    )
  }
}

export default BeerShowContainer;

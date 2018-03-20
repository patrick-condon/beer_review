import React, { Component } from 'react';
import BeerShow from '../components/BeerShow';
import ReviewsIndexContainer from '../containers/ReviewsIndexContainer'

class BeerShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = { beer: {}, currentUser: {} }
    this.deleteBeer = this.deleteBeer.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }


  componentDidMount() {
  let id = this.props.params.id
  fetch(`/api/v1/beers/${id}.json`,{
    credentials: 'same-origin'
  })
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
      this.setState({ beer: body.beer, currentUser: body.user });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
}
  handleDelete(event) {
    event.preventDefault();
      this.deleteBeer()
  }
  deleteBeer() {
    let id = this.props.params.id
    fetch(`/api/v1/beers/${id}.json`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status}`
          let error = new Error(errorMessage)
          throw(error)
        }
      }
    )
    .then(response => response.json())
    .then(body => window.location.href = `/beers/`)
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    let showBeer = this.state.beer
    let description = "This is a beer.";
    let active;
    let label = "https://images.pexels.com/photos/8744/mug-glass-beer.jpg?w=940&h=650&auto=compress&cs=tinysrgb";
    if (showBeer.beer_active == 0) {
      active = 'Beer is not currently available'
    } else if (
      this.state.beer.beer_active == 1
    ) { active = 'Beer is available'
    } else { active = 'Availabilty Unknown' }
    if (showBeer.beer_description != '' && showBeer.beer_description != null) {
      description = showBeer.beer_description
    }
    if (showBeer.beer_label != '' && showBeer.beer_label != null) {
      label = showBeer.beer_label
    }

    let deleteButton;
    if (this.state.currentUser.role != "admin") {
      deleteButton = "hidden"
    } else {
      deleteButton = ""
    }

    return(
      <div>
        <BeerShow
          key={this.state.beer.id} beer_name={this.state.beer.beer_name}
          brewery_name={this.state.beer.brewery_name}
          beer_style={this.state.beer.beer_style} beer_abv={this.state.beer.beer_abv}
          beer_description={description} beer_active={active} beer_label={label}
          onDeleteClick={this.handleDelete}
          deleteButton={deleteButton}
        />
        <ReviewsIndexContainer
          beer_id={this.props.params.id}
        />
      </div>

    )
  }
}

export default BeerShowContainer;

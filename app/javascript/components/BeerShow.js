import React from 'react';
import { Link } from 'react-router';

const BeerShow = props => {
  return(
    <div className="beer-show">
      <img id="beer-img" src={props.beer_label} height="200px" width="200px"/><br />
      <h2 id="beer-show">{props.beer_name}</h2><br />
      <h6>by</h6><br />
      <h3><strong>{props.brewery_name}</strong></h3>

        <ul id="beer-show">
          <li label="style"><strong>Style:</strong> {props.beer_style}</li>
          <li label="abv"><strong>ABV: </strong>{props.beer_abv}</li>
          <li label="description"><strong>Description: </strong>{props.beer_description}</li>
          <li label="availabilty"><strong>Availability: </strong>{props.beer_active}</li>
        </ul>
        <Link to='/' className="back-to-beer">
          Back to Beers List
        </Link>

        <div className="delete-button" hidden={props.deleteButton}>
          <button onClick={props.onDeleteClick}>Delete</button>
        </div>
    </div>
  )
}

export default BeerShow;

import React from 'react';
import { Link } from 'react-router';

const BeerShow = props => {
  return(
    <div className="beer-show">
      <img src={props.beer_label} height="200px" width="200px"/><h2>{props.beer_name}</h2>
      <h3>{props.brewery_name}</h3>
        <ul>
          <li label="style">{props.beer_style}</li>
          <li label="abv">{props.beer_abv}</li>
          <li label="description">{props.beer_description}</li>
          <li label="availabilty">{props.beer_active}</li>
        </ul>
        <Link to='/'>
          Back to Beers List
        </Link>

        <div className="delete-button" hidden={props.deleteButton}>
          <button onClick={props.onDeleteClick}>Delete</button>
        </div>
    </div>
  )
}

export default BeerShow;

import React from 'react';
import { Link } from 'react-router';

const BeerTile = props => {
  return(
    <div>
      <Link to={`/beers/${props.id}`}>
        <li>{props.name}: {props.style}</li>
      </Link>
    </div>
  )
}

export default BeerTile;

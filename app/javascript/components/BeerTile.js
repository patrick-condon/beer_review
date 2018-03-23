import React from 'react';
import { Link } from 'react-router';

const BeerTile = props => {
  return(
    <div id="beer-card">
      <Link to={`/beers/${props.id}`}>
        <img src={props.label} height="300" width="300"/>
        <div className="container">
          <h3><b>{props.name}</b></h3><br />
          <h4>{props.style}</h4>
        </div>
      </Link>
    </div>
  )
}

export default BeerTile;

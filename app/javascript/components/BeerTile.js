import React from 'react';
import { Link } from 'react-router';

const BeerTile = props => {
  return(
    <div id="beer-card">
      <img src={props.label} height="300" width="300"/>
      <div className="container"><Link to={`/beers/${props.id}`}>
        <h3><b>{props.name}</b></h3><br />
        <h4>{props.style}</h4>
      </Link></div>
    </div>
  )
}

export default BeerTile;

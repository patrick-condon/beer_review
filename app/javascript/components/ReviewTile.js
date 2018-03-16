import React from 'react';

const ReviewTile = props => {
  return(
    <div className="review-tile">
      <h3>{props.username} gives this beer a {props.rating}</h3>
      <p>{props.body}</p>
    </div>
  )
}

export default ReviewTile;

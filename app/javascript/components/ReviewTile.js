import React from 'react';

const ReviewTile = props => {
  return(
    <div className="review-tile">
      <h3>{props.username} gives this beer a {props.rating}</h3>
      <p>{props.body}</p>
      <div className="delete-button" hidden={props.deleteButton}>
        <button onClick={props.onDeleteClick}>Delete</button>
      </div>
    </div>
  )
}

export default ReviewTile;

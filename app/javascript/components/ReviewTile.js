import React from 'react';

const ReviewTile = props => {
  let upClass = 'vote-button', upText = 'UpVote',
      downClass = 'vote-button', downText = 'DownVote' ;
  let votes = props.priorVotes.filter(vote => vote.review_id == props.id)
  if (votes.length > 0) {
    if (votes[0].value == 1) {
      upClass += " clicked", upText = 'UpVoted'
    } else if (votes[0].value == -1) {
      downClass += " clicked", downText = 'DownVoted'
    }
  }
  return(
    <div className="review-tile">
      <h3 id="review-tile">{props.username} gives this beer a {props.rating}</h3>
      <p>{props.body}</p>
      <div className="vote-score">
        <button onClick={props.upVote} className={upClass}>
          <i className="far fa-thumbs-up"></i>
          {upText}
        </button>
        Vote Score: {props.voteScore}
        <button onClick={props.downVote} className={downClass}>
          <i className="far fa-thumbs-down"></i>
          {downText}
        </button>
      </div>
      <div className="delete-button" hidden={props.deleteButton}>
        <button onClick={props.onDeleteClick}>Delete</button>
      </div>
    </div>
  )
}

export default ReviewTile;

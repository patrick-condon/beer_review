import React, { Component } from 'react';
import ReviewTile from '../components/ReviewTile';
import ReviewFormContainer from '../containers/ReviewFormContainer';

class ReviewsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { reviews: [], users: [], priorVotes: [], currentUser: {} }
    this.deleteReview = this.deleteReview.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addNewReview = this.addNewReview.bind(this)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
    this.castVote = this.castVote.bind(this)
    this.postData = this.postData.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    let id = this.props.beer_id
    this.getData(id)
  }
  getData(id) {
    fetch(`/api/v1/beers/${id}/reviews.json`, {
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
      this.setState({ reviews: body.reviews, users: body.users,
                      priorVotes: body.prior_votes, currentUser: body.user });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  postData(postAddress, submission) {
    fetch(`${postAddress}`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submission)
    }).then(response => {
        if (response.ok) {
          return response
        } else {
          if (response.status == 401) {
            alert('You must be signed in to do that')
          } else {
          let errorMessage = `${response.status}`
          error = new Error(errorMessage)
          throw(error)
          }
        }
      }
    )
    .then(response => response.json())
    .then(body => {
        this.setState({ reviews: body.reviews, users: body.users,
                        priorVotes: body.prior_votes, currentUser: body.user });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  addNewReview(submission) {
    let id = submission.beer_id
    let postAddress = `/api/v1/beers/${id}/reviews`
    this.postData(postAddress, submission)
  }
  upVote(id) {
    let upvote = { vote: {
      value: 1, review_id: id, beer_id: Number(this.props.beer_id),
      user_id: this.state.currentUser.id
    }}
    this.castVote(upvote)
  }
  downVote(id) {
    let downvote = { vote: {
      value: -1, review_id: id, beer_id: Number(this.props.beer_id),
      user_id: this.state.currentUser.id
    }}
    this.castVote(downvote)
  }
  castVote(submission) {
    let beer_id = submission.vote.beer_id
    let review_id = submission.vote.review_id
    let postAddress = `/api/v1/beers/${beer_id}/reviews/${review_id}/votes`
    this.postData(postAddress, submission)
  }
  handleDelete(id) {
      this.deleteReview(id)
  }
  deleteReview(id) {
    let beerId = this.props.beer_id
    fetch(`/api/v1/beers/${beerId}/reviews/${id}.json`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status}`
          error = new Error(errorMessage)
          throw(error)
        }
      }
    )
    .then(response => response.json())
    .then(body => {this.setState({ reviews: body.reviews });
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    console.log(this.state)
    let users = this.state.users
    let priorVotes = this.state.priorVotes
    let reviews = this.state.reviews.map(review => {
      let author
      users.forEach(user => {
        if (user.id == review.user_id) {
          author = user
        }
      })
      let deleteButton;
      if (this.state.currentUser.role != "admin") {
        deleteButton = "hidden"
      } else {
        deleteButton = ""
      }
      let buttonClick = () => {this.handleDelete(review.id)}
      let upVote = () => {this.upVote(review.id)}
      let downVote = () => {this.downVote(review.id)}

      return(
        <ReviewTile
          key={review.id}
          id={review.id}
          username={author.username}
          rating={review.rating}
          body={review.body}
          voteScore={review.vote_score}
          priorVotes={priorVotes}
          upVote={upVote}
          downVote={downVote}
          onDeleteClick={buttonClick}
          deleteButton={deleteButton}
        />
      )
    })
    return(
      <div>
        <div id="review-form">
        <h2 id="review-form">Add a Review</h2>
        <ReviewFormContainer
          beer_id={this.props.beer_id}
          user_id={this.props.user_id}
          addNewReview={this.addNewReview}
        />
        </div>
        <div id="review-index">
          <h2 id="review-index">Reviews</h2>
          {reviews}
        </div>
      </div>
    )
  }
}

export default ReviewsIndexContainer

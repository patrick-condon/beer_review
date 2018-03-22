import React, { Component } from 'react';
import ReviewTile from '../components/ReviewTile';
import ReviewFormContainer from '../containers/ReviewFormContainer';

class ReviewsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { reviews: [], users: [], currentUser: {} }
    this.deleteReview = this.deleteReview.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addNewReview = this.addNewReview.bind(this)
  }

  componentDidMount() {
    let id = this.props.beer_id
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
        this.setState({ reviews: body.reviews, users: body.users, currentUser: body.user });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewReview(submission) {
    let id = submission.beer_id
    fetch(`/api/v1/beers/${id}/reviews`, {
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
          let errorMessage = `${response.status}`
          error = new Error(errorMessage)
          throw(error)
        }
      }
    )
    .then(response => response.json())
    .then(body => {
    let currentReviews = this.state.reviews
    let joined = currentReviews.concat(body.review)
    let newUsers = this.state.users.concat(body.user)
    this.setState( {reviews: joined, users: newUsers} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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
    let users = this.state.users
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

      return(
        <ReviewTile
          key={review.id}
          username={author.username}
          rating={review.rating}
          body={review.body}
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

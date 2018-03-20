import React, { Component } from 'react';
import ReviewTile from '../components/ReviewTile';
import ReviewFormContainer from '../containers/ReviewFormContainer';

class ReviewsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { reviews: [], users: [] }

    this.addNewReview = this.addNewReview.bind(this)
  }

  componentDidMount() {
    let id = this.props.beer_id
    fetch(`/api/v1/beers/${id}/reviews.json`, {
      credentials: 'same-origin',
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
        this.setState({ reviews: body.reviews, users: body.users });
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

  render() {
    let users = this.state.users
    let reviews = this.state.reviews.map(review => {
      let author
      users.forEach(user => {
        if (user.id == review.user_id) {
          author = user
        }
      })
      return (
        <ReviewTile
          key={review.id}
          username={author.username}
          rating={review.rating}
          body={review.body}
        />
      )
    })

    return(
      <div>
        <h3>Add a Review</h3>
        <ReviewFormContainer
          beer_id={this.props.beer_id}
          user_id={this.props.user_id}
          addNewReview={this.addNewReview}
        />
        <h2>Reviews</h2>
        {reviews}
      </div>
    )
  }
}

export default ReviewsIndexContainer

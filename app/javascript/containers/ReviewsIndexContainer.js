import React, { Component } from 'react';
import ReviewTile from '../components/ReviewTile';

class ReviewsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { reviews: [], users: [], currentUser: {} }
    this.deleteReview = this.deleteReview.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let id = this.props.beer_id
    fetch(`/api/v1/beers/${id}/reviews.json`,{
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
  handleDelete(id) {
      this.deleteReview(id)
  }
  deleteReview(id) {
    let beerId = this.props.beer_id
    fetch(`/api/v1/beers/${beerId}/reviews/${id}.json`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status}`
          let error = new Error(errorMessage)
          throw(error)
        }
      }
    )
    .then(response => response.json())
    .then(body => {
      this.setState({ reviews: body.reviews });
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
        <h2>Reviews</h2>
        {reviews}
      </div>
    )
  }
}

export default ReviewsIndexContainer

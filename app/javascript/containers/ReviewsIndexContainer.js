import React, { Component } from 'react';
import ReviewTile from '../components/ReviewTile';

class ReviewsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { reviews: [], users: [] }
  }

  componentDidMount() {
    let id = this.props.beer_id
    fetch(`/api/v1/beers/${id}/reviews.json`)
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
        <h2>Reviews</h2>
        {reviews}
      </div>
    )
  }
}

export default ReviewsIndexContainer

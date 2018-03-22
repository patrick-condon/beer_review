import React, { Component } from 'react';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';

class ReviewFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewBody: '',
      rating: '',
      ratingOptions: [0.0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0,
      2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0],
      errors: {}
    }
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.validateField = this.validateField.bind(this)
  }

  handleRatingChange(event) {
    this.validateField(event.target.value, { rating: 'Rating may not be blank' } )
    this.setState( {rating: event.target.value} )
  }

  handleBodyChange(event) {
    this.validateField(event.target.value, { body: 'Body may not be blank' } )
    this.setState( {reviewBody: event.target.value} )
  }

  validateField(text, error) {
    if (text === '' || text === ' ') {
      let newError = error
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      let errorKey = Object.keys(error)[0]
      delete errorState[errorKey]
      this.setState({ errors: errorState })
      return true
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateField(this.state.rating, {rating: 'Rating must be given'}) &&
      this.validateField(this.state.reviewBody, {body: 'Review must be given'})
    ) {
      let formPayload = { review: {
        rating: this.state.rating,
        body: this.state.reviewBody,
        beer_id: this.props.beer_id,
        user_id: this.props.user_id,
        vote_score: 0
      } };
      this.props.addNewReview(formPayload);
      this.setState( {rating: '', reviewBody: ''} )
    }
  }


  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <form className="new-review-form callout" onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <SelectField id="rating"
          handlerFunction={this.handleRatingChange}
          name='rating'
          label='Rating'
          options={this.state.ratingOptions}
          selectedOption={this.state.rating}
        />
        <TextField id="review"
          content={this.state.reviewBody}
          label="Review Body"
          name="review-body"
          type="text"
          handleChange={this.handleBodyChange}
        />

        <div className="button-group">
          <input className="button" id="submit" type="submit" value="Submit Review"/>
        </div>
      </form>
    )
  }
}

export default ReviewFormContainer;

import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from '../components/TextField'

class BeerFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beerName: '',
      breweryName: '',
      beerStyle: '',
      beerDescription: '',
      beerAbv: '',
      beerActive: '',
      beerLabel: '',
      errors: {}
    }
    this.handleBeerNameChange = this.handleBeerNameChange.bind(this)
    this.validateField - this.validateField.bind(this)
    this.handleBreweryNameChange = this.handleBreweryNameChange.bind(this)
    this.handleBeerStyleChange = this.handleBeerStyleChange.bind(this)
    this.handleBeerAbvChange = this.handleBeerAbvChange.bind(this)
    this.handleBeerActiveChange = this.handleBeerActiveChange.bind(this)
    this.handleBeerDescriptionChange = this.handleBeerDescriptionChange.bind(this)
    this.handleBeerLabelChange = this.handleBeerLabelChange.bind(this)
    this.addNewBeer = this.addNewBeer.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  validateField(text, error) {
    if (text === '' || text === ' ') {
      let newError = error
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else if (Object.keys(error)[0] == 'beerAbv' && isNaN(text)) {
      let newError = { abvNotNumber: 'ABV Must Be a Number' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else if (Object.keys(error)[0] == 'beerAbv' && !isNaN(text)) {
      let errorState = this.state.errors
      delete errorState.abvNotNumber
      delete errorState.beerAbv
      this.setState({ errors: errorState })
      return true
    } else {
      let errorState = this.state.errors
      let errorKey = Object.keys(error)[0]
      delete errorState[errorKey]
      this.setState({ errors: errorState })
      return true
    }
  }

  handleBeerNameChange(event) {
    this.validateField(event.target.value, { beerName: 'Beer Name may not be blank' } )
    this.setState( { beerName: event.target.value } )
  }
  handleBreweryNameChange(event) {
    this.validateField(event.target.value, { breweryName: 'Brewery Name may not be blank' } )
    this.setState( { breweryName: event.target.value } )
  }
  handleBeerStyleChange(event) {
    this.validateField(event.target.value, { beerStyle: 'Beer Style may not be blank' } )
    this.setState( { beerStyle: event.target.value } )
  }
  handleBeerAbvChange(event) {
    this.validateField(event.target.value, { beerAbv: 'Beer ABV may not be blank' } )
    this.setState( { beerAbv: event.target.value } )
  }
  handleBeerDescriptionChange(event) {
    this.setState( { beerDescription: event.target.value } )
  }
  handleBeerLabelChange(event) {
    this.setState( { beerLabel: event.target.value } )
  }
  handleBeerActiveChange(event) {
    this.setState( { beerActive: event.target.value } )
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateField(this.state.beerName, 'name') &&
      this.validateField(this.state.breweryName, 'brewery') &&
      this.validateField(this.state.beerStyle, 'style') &&
      this.validateField(this.state.beerAbv, 'abv')
    ) {
      let newBeer = {
        beerName: this.state.beerName,
        breweryName: this.state.breweryName,
        beerStyle: this.state.beerStyle,
        beerDescription: this.state.beerDescription,
        beerAbv: this.state.beerAbv,
        beerActive: this.state.beerActive,
        beerLabel: this.state.beerLabel
      }
      this.addNewBeer(newBeer)
    }
  }
  addNewBeer(submission) {
    fetch("/api/v1/beers", {
      method: 'post',
      headers: new Headers(),
      body: JSON.stringify(submission)
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
    .then(body => window.location.href = `/beers/${body.id}`)
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }


  render() {
    let errorDiv
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <form className="new-beer-form" onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <TextField
          content={this.state.beerName}
          label="Beer Name"
          name="beer-name"
          handleChange={this.handleBeerNameChange}
        />
        <TextField
          content={this.state.breweryName}
          label="Brewery Name"
          name="brewery-name"
          handleChange={this.handleBreweryNameChange}
        />
        <TextField
          content={this.state.beerStyle}
          label="Beer Style"
          name="beer-style"
          handleChange={this.handleBeerStyleChange}
        />
        <TextField
          content={this.state.beerAbv}
          label="Beer ABV"
          name="beer-abv"
          handleChange={this.handleBeerAbvChange}
        />
        <TextField
          content={this.state.beerDescription}
          label="Beer Description (optional)"
          name="beer-description"
          handleChange={this.handleBeerDescriptionChange}
        />
        <TextField
          content={this.state.beerLabel}
          label="Beer Label URL (optional)"
          name="beer-label"
          handleChange={this.handleBeerLabelChange}
        />
        <label>Is Beer Currently Available?
          <input type="radio" name="beer-active" value="1"  onChange={this.handleBeerActiveChange}/>Yes
          <input type="radio" name="beer-active" value="0"  onChange={this.handleBeerActiveChange}/>No
        </label>
        <input type="submit" value="Add Beer!" />
      </form>
    )
  }
}

export default BeerFormContainer;

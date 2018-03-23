import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from '../components/TextField'

class BeerFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add New Beer',
      buttonText: 'Add Beer!',
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
    this.validateField = this.validateField.bind(this)
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
      this.validateField(this.state.beerName, { beerName: 'Beer Name may not be blank' }) &&
      this.validateField(this.state.breweryName, { breweryName: 'Brewery Name may not be blank' }) &&
      this.validateField(this.state.beerStyle, { beerStyle: 'Beer Style may not be blank' }) &&
      this.validateField(this.state.beerAbv, { beerAbv: 'Beer ABV may not be blank' })
    ) {
      let newBeer = { beer: {
        beer_name: this.state.beerName,
        brewery_name: this.state.breweryName,
        beer_style: this.state.beerStyle,
        beer_description: this.state.beerDescription,
        beer_abv: this.state.beerAbv,
        beer_active: this.state.beerActive,
        beer_label: this.state.beerLabel
      } }
      if (this.props.params.id) {
        this.editBeer(newBeer)
      } else {
        this.addNewBeer(newBeer)
      }
    }
  }

  componentDidMount() {
    if (this.props.params.id) {
      let id = this.props.params.id
      fetch(`/api/v1/beers/${id}.json`,{
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
          this.setState({
          title: 'Edit Beer',
          buttonText: 'Submit Changes',
          beerName: body.beer.beer_name,
          breweryName: body.beer.brewery_name,
          beerStyle: body.beer.beer_style,
          beerDescription: body.beer.beer_description,
          beerAbv: body.beer.beer_abv,
          beerActive: body.beer.beer_active,
          beerLabel: body.beer.beer_label
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  editBeer(submission) {
    let id = this.props.params.id
    fetch(`/api/v1/beers/${id}`, {
      method: 'PATCH',
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
          let error = new Error(errorMessage)
          throw(error)
        }
      }
    )
    .then(response => response.json())
    .then(body => window.location.href = `/beers/${body.id}`)
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  addNewBeer(submission) {
    fetch("/api/v1/beers", {
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
    let title = this.state.title
    let buttonText = this.state.buttonText
    return(
      <form className="new-beer-form" onSubmit={this.handleFormSubmit}>
        <h2>{title}</h2>
        {errorDiv}
        <div className="new-beer-fields">
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
          <input type="submit" value={buttonText} />
        </div>
      </form>
    )
  }
}

export default BeerFormContainer;

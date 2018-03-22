import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from '../components/TextField'

class SearchBarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { searchText: '', errors: {} }
    this.validateField = this.validateField.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleSearchChange(event) {
    this.setState( {searchText: event.target.value} )
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
      this.validateField(this.state.searchText, { search: 'Search may not be blank' } )
    ) {
      let formPayload = this.state.searchText
      this.props.search(formPayload);
      this.setState({ searchText: '' })
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
    return (
      <div className="search">
      <form id="search" onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <span className="text-field">
        <TextField
          content={this.state.searchText}
          label=""
          name="search"
          type="text"
          handleChange={this.handleSearchChange}
        />
      </span>
        <input className="button" id="submit" type="submit" value="Search"/>
      </form>
    </div>
    )
  }
}

export default SearchBarContainer;

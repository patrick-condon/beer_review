import React, { Component } from 'react';
import BeerTile from '../components/BeerTile';
import SearchBarContainer from '../containers/SearchBarContainer';
import { Link } from 'react-router';

class BeersIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      allBeers: [],
      searchResults: [],
      title: 'All Beers',
      beersPerPage: 6,
      currentPage: 1
      }
    this.search = this.search.bind(this)
    this.backToAll = this.backToAll.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  search(submission) {
    let beers = this.state.allBeers
    let search = submission
    let results = beers.filter(beer =>
      beer.beer_name.toLowerCase().includes(search.toLowerCase()) ||
      beer.beer_style.toLowerCase().includes(search.toLowerCase()) ||
      beer.brewery_name.toLowerCase().includes(search.toLowerCase())
    )
    this.setState({title: 'Search Results', searchResults: results})
  }
  backToAll() {
    this.setState({ title: 'All Beers', searchResults: [], currentPage: 1 })
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    fetch('/api/v1/beers.json')
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
        this.setState({ allBeers: body.beers, displayBeers: body.beers });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let beersPerPage = this.state.beersPerPage
    let displayBeers
    if (this.state.title == 'All Beers') {
      let lastIndex = this.state.currentPage * beersPerPage
      let firstIndex = lastIndex - beersPerPage
      displayBeers = this.state.allBeers.slice(firstIndex, lastIndex)
    } else {
      displayBeers = this.state.searchResults
    }
    let beers = displayBeers.map(beer => {
      return (
        <BeerTile
          key={beer.id}
          id={beer.id}
          name={beer.beer_name}
          style={beer.beer_style}
        />
      )
    })
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(this.state.allBeers.length / beersPerPage); i++) {
          pageNumbers.push(i);
        }
    let pages = pageNumbers.map(number => {
      return (
        <a onClick={this.handleClick}>
          <li
            key={number}
            id={number}
          >
          {number}
          </li>
        </a>
      );
    })
    let link
    if (this.state.title == 'All Beers') {
      link = <Link to={'add_new_beer'}>Add New Beer</Link>
    } else {
      link = <a onClick={this.backToAll}>Back to All Beers</a>
    }
    return(
      <div>
        <h1>{this.state.title}</h1>
        <SearchBarContainer
          beers={this.state.beers}
          search={this.search}
        />
        {beers}
        <ul id="page-numbers">
          {pages}
        </ul>
        {link}
      </div>
    )
  }
}
export default BeersIndexContainer;

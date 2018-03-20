import React, { Component } from 'react';
import BeerTile from '../components/BeerTile';
import SearchBarContainer from '../containers/SearchBarContainer';
import { Link } from 'react-router';

class BeersIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = { allBeers: [], displayBeers: [], title: 'All Beers' }
    this.search = this.search.bind(this)
    this.backToAll = this.backToAll.bind(this)
  }

  search(submission) {
    let beers = this.state.allBeers
    let search = submission
    let results = beers.filter(beer =>
      beer.beer_name.toLowerCase().includes(search.toLowerCase()) ||
      beer.beer_style.toLowerCase().includes(search.toLowerCase()) ||
      beer.brewery_name.toLowerCase().includes(search.toLowerCase())
    )
    this.setState({title: 'Search Results', displayBeers: results})
  }
  backToAll() {
    this.setState({ title: 'All Beers', displayBeers: this.state.allBeers})
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
    let beers = this.state.displayBeers.map(beer => {
      return (
        <BeerTile
          key={beer.id}
          id={beer.id}
          name={beer.beer_name}
          style={beer.beer_style}
        />
      )
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
        {link}
      </div>
    )
  }
}
export default BeersIndexContainer;

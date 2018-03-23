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
      title: 'Welcome to the Belcher Report',
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
    this.setState({ title: 'Welcome to the Belcher Report', searchResults: [], currentPage: 1 })
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

    let displayBeers, lastIndex, firstIndex, pageBeers;
    if (this.state.title == 'Welcome to the Belcher Report') {
      displayBeers = this.state.allBeers
    } else {
      displayBeers = this.state.searchResults
    }
    if (displayBeers.length > beersPerPage) {
      lastIndex = this.state.currentPage * beersPerPage
      firstIndex = lastIndex - beersPerPage
      pageBeers = displayBeers.slice(firstIndex, lastIndex)
    } else {
      pageBeers = displayBeers
    }
    let beers = pageBeers.map(beer => {
    let label = "https://res.cloudinary.com/teepublic/image/private/s--Q0hxbAVt--/t_Resized Artwork/c_fit,g_north_west,h_954,w_954/co_191919,e_outline:48/co_191919,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1497200957/production/designs/1660854_1.jpg";
    if (beer.beer_label != '' && beer.beer_label != null) {
      label = beer.beer_label
    }

      return (
        <BeerTile
          key={beer.id}
          id={beer.id}
          name={beer.beer_name}
          style={beer.beer_style}
          label={label}
        />
      )
    })
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(displayBeers.length / beersPerPage); i++) {
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
    if (this.state.title == 'Welcome to the Belcher Report') {
      link = <Link to={'add_new_beer'}>Add New Beer</Link>
    } else {
      link = <a onClick={this.backToAll}>Back to All Beers</a>
    }
    return(
      <div id="beers_index">
        <h1>{this.state.title}</h1>
        <SearchBarContainer
          beers={this.state.beers}
          search={this.search}
        />
        <div className="index-container">
          {beers}
        </div>
        <ul id="page-numbers">
          {pages}
        </ul>
        <div className="add-beer">{link}</div>
      </div>
    )
  }
}
export default BeersIndexContainer;

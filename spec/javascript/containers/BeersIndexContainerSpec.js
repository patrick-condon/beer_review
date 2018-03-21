import BeerTile from '../../../app/javascript/components/BeerTile';
import BeersIndexContainer from '../../../app/javascript/containers/BeersIndexContainer';
import SearchBarContainer from '../../../app/javascript/containers/SearchBarContainer';
import 'isomorphic-fetch'

describe('BeersIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(BeersIndexContainer.prototype, 'search').and.callThrough();
    wrapper = mount(<BeersIndexContainer />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      allBeers: [],
      searchResults: [],
      title: 'All Beers',
      beersPerPage: 6,
      currentPage: 1    })
  })

  it('should display an h1', () => {
    expect(wrapper.find('h1')).toBePresent()
  })

  it('should display a search bar container', () => {
    expect(wrapper.find(SearchBarContainer)).toBePresent()
  })

  it('should not search with an empty field', () => {
    wrapper.find('form').simulate('submit');
    expect(wrapper.find(SearchBarContainer).text()).toContain('Search may not be blank')
  })

  it('should rerender upon search', () => {
    wrapper.setState({ allBeers: [ { beer_name: 'A Beer', brewery_name: 'A Brewery',
                                   beer_style: 'Style', beer_abv: 4 } ]})
    wrapper.find(SearchBarContainer).props().search('style');
    expect(BeersIndexContainer.prototype.search).toHaveBeenCalled()
    expect(wrapper.state()).toEqual({
      allBeers: [ { beer_name: 'A Beer', brewery_name: 'A Brewery',
                    beer_style: 'Style', beer_abv: 4 } ],
      searchResults: [ { beer_name: 'A Beer', brewery_name: 'A Brewery',
                        beer_style: 'Style', beer_abv: 4 } ],
                        title: 'Search Results', beersPerPage: 6, currentPage: 1
    })
    expect(wrapper.find('h1').text()).toBe('Search Results')
  })
  it('implements pagination to show however many beers specified', () => {
    wrapper.setState({ allBeers: [ { beer_name: 'A Beer', brewery_name: 'A Brewery',
                                     beer_style: 'Style', beer_abv: 4 },
                                   { beer_name: 'New Beer', brewery_name: 'New Brewery',
                                     beer_style: 'New Style', beer_abv: 5 }
                                  ], beersPerPage: 1 })
    expect(wrapper.find('li').at(0).text()).toBe('A Beer: Style')
    expect(wrapper.find('li').at(1).text()).not.toBe('New Beer: New Style')
  })
  it('shows the next page when clicked', () => {
    wrapper.setState({ allBeers: [ { beer_name: 'A Beer', brewery_name: 'A Brewery',
                                     beer_style: 'Style', beer_abv: 4 },
                                   { beer_name: 'New Beer', brewery_name: 'New Brewery',
                                     beer_style: 'New Style', beer_abv: 5 }
                                  ], beersPerPage: 1 })
    expect(wrapper.find('li').at(0).text()).toBe('A Beer: Style')
    expect(wrapper.find('li').at(1).text()).not.toBe('New Beer: New Style')
    wrapper.find('li').at(2).simulate('click')
    expect(wrapper.find('li').at(0).text()).toBe('New Beer: New Style')
  })
})

import BeerShow from '../../../app/javascript/components/BeerShow';
import BeerShowContainer from '../../../app/javascript/containers/BeerShowContainer';
import 'isomorphic-fetch'

describe('BeerShowContainer', () => {
  let wrapper;
  let id;

  beforeEach(() => {
    wrapper = mount(<BeerShowContainer
      params={{id: 1}}
     />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      beer: {}, currentUser: {}
    })
  })

  it('should return a beer show component', () => {
    expect(wrapper.find('BeerShow')).toBePresent()
  })

  it('should display a review index container', () => {
    expect(wrapper.find('ReviewsIndexContainer')).toBePresent()
  })

  it('should render the Beer Component with correct information when state changes', () => {
    wrapper.setState({ beer: {
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: '5.8'
      }
    });
    expect(wrapper.find('h2').at(0).text()).toBe('Burning River')
    expect(wrapper.find('h3').at(0).text()).toBe('Great Lakes')
    expect(wrapper.find('[label="style"]').text()).toBe('Style: Pale Ale')
    expect(wrapper.find('[label="abv"]').text()).toBe('ABV: 5.8')
  });
  it('should populate empty fields', () => {
    wrapper.setState({ beer: {
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: '5.8'
      }
    });
    expect(wrapper.find('[label="description"]').text()).toBe("Description: This is a beer.")
    expect(wrapper.find('[label="availabilty"]').text()).toBe('Availability: Availabilty Unknown')
  })
})

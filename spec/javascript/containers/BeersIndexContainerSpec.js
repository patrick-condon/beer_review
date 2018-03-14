import BeerTile from '../../../app/javascript/components/BeerTile';
import BeersIndexContainer from '../../../app/javascript/containers/BeersIndexContainer';
import 'isomorphic-fetch'

describe('BeersIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BeersIndexContainer />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      beers: []
    })
  })

  it('should display an h1', () => {
    expect(wrapper.find('h1')).toBePresent()
  })
})

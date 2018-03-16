import ReviewTile from '../../../app/javascript/components/ReviewTile';
import ReviewsIndexContainer from '../../../app/javascript/containers/ReviewsIndexContainer';
import 'isomorphic-fetch'

describe('ReviewsIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ReviewsIndexContainer
      params={{beer_id: 1}}
     />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      reviews: [], users: []
    })
  })

  it('should display an h2', () => {
    expect(wrapper.find('h2').at(0).text()).toBe('Reviews')
  })

  it('should render the Review Component with correct information when state changes', () => {
    wrapper.setState({
      reviews: [ { rating: '4', body: 'This is beer' } ],
      users: [ { username: 'VincentAdultman' } ]
    });
    expect(wrapper.find('h3').text()).toBe("VincentAdultman gives this beer a 4")
    expect(wrapper.find('p').text()).toBe('This is beer')
  });

})

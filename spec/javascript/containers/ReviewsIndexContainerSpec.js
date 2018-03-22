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
      reviews: [], users: [], priorVotes: [], currentUser: {}
    })
  })

  it('should display an h2', () => {
    expect(wrapper.find('h2').at(1).text()).toBe('Reviews')
  })

  it('should display a review form container', () => {
    expect(wrapper.find('ReviewFormContainer')).toBePresent()
  })

  it('should render the Review Component with correct information when state changes', () => {
    wrapper.setState({
      reviews: [ { id: '1', rating: '4', body: 'This is beer' } ],
      users: [ { username: 'VincentAdultman' } ]
    });
    expect(wrapper.find('[className="review-tile"]').text()).toContain('VincentAdultman gives this beer a 4')
    expect(wrapper.find('p').text()).toBe('This is beer')
  });
})

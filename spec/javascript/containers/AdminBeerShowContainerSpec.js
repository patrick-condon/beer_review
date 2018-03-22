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

  it('should render the delete button when state changes', () => {
    wrapper.setState({ currentUser: {email: "admin@admin.com", username: "Waylon_Smithers", profile_photo: "nil", role: "admin", password: "password"}
    });
    expect(wrapper.find('button')).toBePresent()
  });

  it('should render the edit button when state changes', () => {
    wrapper.setState({ currentUser: {email: "admin@admin.com", username: "Waylon_Smithers", profile_photo: "nil", role: "admin", password: "password"}
    });
    expect(wrapper.find('Link')).toBePresent()
  });
})

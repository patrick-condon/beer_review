import ReviewTile from '../../../app/javascript/components/ReviewTile';

describe('ReviewTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReviewTile
        username="VincentAdultman"
        rating="4"
        body="This beer tastes funny"
        deleteButton=""
      />
    )
  });

  it('renders an h3 tag with the reviewers username and rating', () => {
    expect(wrapper.find('h3').text()).toBe("VincentAdultman gives this beer a 4")
  })

  it('contains a p tag with the review body', () => {
    expect(wrapper.find('p').text()).toBe('This beer tastes funny')
  })

  it('it should render a button', () => {
    expect(wrapper.find('button')).toBePresent()
  })
})

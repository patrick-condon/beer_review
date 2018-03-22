import BeerTile from '../../../app/javascript/components/BeerTile';

describe('BeerTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BeerTile
        id="1"
        name="Murphy's Stout"
        style="Dry Stout"
      />
    )
  });

  it('renders a list tag with the beer name', () => {
    expect(wrapper.find('h3').text()).toBe("Murphy's Stout")
  })

  it('contains a link to the beer page', () => {
    expect(wrapper.find('Link')).toHaveProp('to', `/beers/1`)
  })
})

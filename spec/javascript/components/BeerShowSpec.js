import BeerShow from '../../../app/javascript/components/BeerShow';

describe('BeerShow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BeerShow
        key="1"
        beer_name="Test Beer"
        brewery_name="Test Brewery"
        beer_style="Test Style"
        beer_abv="9.9"
        beer_description="Test Description"
        beer_active="available"
        beer_label="www.beerlabel.com"
      />
    )
  });

  it('renders a h2 tag with the beer name', () => {
    expect(wrapper.find('h2').text()).toBe("Test Beer")
  })

  it('renders a h3 tag with the beer name', () => {
    expect(wrapper.find('h3').text()).toBe("Test Brewery")
  })

  it('renders a li tag with the beer style', () => {
    expect(wrapper.find('[label="style"]').text()).toBe("Style: Test Style")
  })

  it('renders a li tag with the beer abv', () => {
    expect(wrapper.find('[label="abv"]').text()).toBe("ABV: 9.9")
  })

  it('renders a li tag with the beer description', () => {
    expect(wrapper.find('[label="description"]').text()).toBe("Description: Test Description")
  })

  it('renders a li tag with the beer availabilty', () => {
    expect(wrapper.find('[label="availabilty"]').text()).toBe("Availability: available")
  })

  it('contains an image of the beer label', () => {
    expect(wrapper.find('img')).toHaveProp('src', "www.beerlabel.com")
  })
})

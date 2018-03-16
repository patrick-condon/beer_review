import TextField from '../../../app/javascript/components/TextField';
import BeerFormContainer from '../../../app/javascript/containers/BeerFormContainer';

describe('BeerFormContainer', () => {
  let wrapper,
  addNewBeer;

  beforeEach(() => {
    addNewBeer = jasmine.createSpy('addNewBeer spy')
    spyOn(BeerFormContainer.prototype, 'handleFormSubmit').and.callThrough();
    spyOn(BeerFormContainer.prototype, 'addNewBeer').and.callThrough();

    wrapper = mount(<BeerFormContainer />
    )
  })

  it('should have the specified initial state', () => {
    expect(wrapper.state()).toEqual({
      beerName: '',
      breweryName: '',
      beerStyle: '',
      beerDescription: '',
      beerAbv: '',
      beerActive: '',
      beerLabel: '',
      errors: {}
    })
  })

  it('should display a TextField object', () => {
    expect(wrapper.find(TextField)).toBePresent()
  })

  it('should transfer the text props to the fields from state', () => {
    wrapper.setState({ beerName: 'A Beer', breweryName: 'A Brewery' })
    expect(wrapper.find(TextField).at(0)).toHaveProp('content', 'A Beer')
    expect(wrapper.find(TextField).at(1)).toHaveProp('content', 'A Brewery')
  })

  it('should display an input', () => {
    expect(wrapper.find('label')).toBePresent()
  })

  it('should have a radio button that checks', () => {
    expect(wrapper.find('input[type="radio"]')).toBePresent()
    wrapper.find('input[type="radio"]').at(0).simulate('change')
    expect(wrapper.state('beerActive')).toBe("1")
  })

  it('should trigger handleFormSubmit and addNewBeer on submission', () => {
    wrapper.setState({ beerName: 'A Beer', breweryName: 'A Brewery',
                       beerStyle: 'Style', beerAbv: 4 })
    wrapper.find('form').simulate('submit');
    expect(BeerFormContainer.prototype.handleFormSubmit).toHaveBeenCalled()
    expect(BeerFormContainer.prototype.addNewBeer).toHaveBeenCalled()
  })

  it('should not submit with empty fields', () => {
    wrapper.find('form').simulate('submit');
    expect(BeerFormContainer.prototype.addNewBeer).not.toHaveBeenCalled()
  })
})

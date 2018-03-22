import TextField from '../../../app/javascript/components/TextField';
import BeerFormContainer from '../../../app/javascript/containers/BeerFormContainer';

describe('BeerFormContainer', () => {
  let wrapper,
  editBeer,
  params = {id: 1};

  beforeEach(() => {
    editBeer = jasmine.createSpy('editBeer spy')
    spyOn(BeerFormContainer.prototype, 'handleFormSubmit').and.callThrough();
    spyOn(BeerFormContainer.prototype, 'editBeer').and.callThrough();

    wrapper = mount(<BeerFormContainer
      params={params}
      />
    )
  })

  it('should have the specified initial state', () => {
    expect(wrapper.state()).toEqual({
      title: 'Add New Beer',
      buttonText: 'Add Beer!',
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

  it('should have a radio button that checks', () => {
    expect(wrapper.find('input[type="radio"]')).toBePresent()
    wrapper.find('input[type="radio"]').at(0).simulate('change')
    expect(wrapper.state('beerActive')).toBe("1")
  })

  it('should trigger handleFormSubmit and editBeer on submission', () => {
    wrapper.setState({ beerName: 'A Beer', breweryName: 'A Brewery',
                       beerStyle: 'Style', beerAbv: 4 })
    wrapper.find('form').simulate('submit');
    expect(BeerFormContainer.prototype.handleFormSubmit).toHaveBeenCalled()
    expect(BeerFormContainer.prototype.editBeer).toHaveBeenCalled()
  })

  it('should not submit with empty fields', () => {
    wrapper.find('form').simulate('submit');
    expect(BeerFormContainer.prototype.editBeer).not.toHaveBeenCalled()
  })
})

import TextField from '../../../app/javascript/components/TextField';
import SearchBarContainer from '../../../app/javascript/containers/SearchBarContainer';

describe('SearchBarContainer', () => {
  let wrapper,
  beers = [],
  search,
  handleFormSubmit;

  beforeEach(() => {
    search = jasmine.createSpy('search spy')
    spyOn(SearchBarContainer.prototype, 'handleFormSubmit').and.callThrough();

    wrapper = mount(<SearchBarContainer
      beers={beers}
      search={search}
     />
    )
  })

  it('should have the specified initial state', () => {
    expect(wrapper.state()).toEqual({ searchText: '', errors: {} })
  })

  it('should display a TextField object', () => {
    expect(wrapper.find(TextField)).toBePresent()
  })

  it('should transfer the text props to the fields from state', () => {
    wrapper.setState({ searchText: 'Beer' })
    expect(wrapper.find(TextField)).toHaveProp('content', 'Beer')
  })

  it('should display an input', () => {
    expect(wrapper.find('label')).toBePresent()
  })

  it('should trigger handleFormSubmit and search on submission', () => {
    wrapper.setState({ searchText: 'beer' })
    wrapper.find('form').simulate('submit');
    expect(SearchBarContainer.prototype.handleFormSubmit).toHaveBeenCalled()
    expect(search).toHaveBeenCalled()
  })

  it('should not submit with empty fields', () => {
    wrapper.find('form').simulate('submit');
    expect(search).not.toHaveBeenCalled()
  })
})

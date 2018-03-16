import TextField from '../../../app/javascript/components/TextField'

describe('TextField', () => {
  let wrapper,
  handleChange,
  name,
  label,
  content;

  beforeEach(() => {
    handleChange = jasmine.createSpy('handleChange spy');
    wrapper = mount(
      <TextField
        handleChange={handleChange}
        content=''
        name=''
        label=''
      />
    )
  })

  it('should render a TextField component that has an input field and a label', () => {
    expect(wrapper.find('TextField')).toBePresent()
    expect(wrapper.find('input')).toBePresent()
    expect(wrapper.find('label')).toBePresent()
  })

  it('should display a label passed down through props', () => {
    wrapper.setProps({label: 'Field Label'})
    expect(wrapper.find('label').text()).toBe('Field Label')
  })

  it('should invoke the handleChange from props on change', () => {
    wrapper.find('input').simulate('change');
    expect(handleChange).toHaveBeenCalled();
  })

  it('should inherit value and name from props when content changes', () => {
    wrapper.setProps({content: 'Typed text', name: 'Name'});
    expect(wrapper.find('input')).toHaveProp('value', 'Typed text')
    expect(wrapper.find('input')).toHaveProp('name', 'Name')
  })
})

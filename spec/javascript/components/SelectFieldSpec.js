import SelectField from '../../../app/javascript/components/SelectField'

describe('SelectField', () => {
  let wrapper,
  handleChange,
  name,
  label,
  options = ['1', '2'],
  selectedOption;

  beforeEach(() => {
    handleChange = jasmine.createSpy('handleChange spy');
    wrapper = mount(
      <SelectField
        handleChange={handleChange}
        options={options}
        name='rating'
        label=''
        selectedOption =''
      />
    )
  })

  it('should render a SelectField component', () => {
    expect(wrapper.find('SelectField')).toBePresent()
  })

  it('should display a label passed down through props', () => {
    wrapper.setProps({label: 'Field Label'})
    expect(wrapper.find('label').text()).toContain('Field Label')
  })

  it('should pass down  from props on change', () => {
    wrapper.setProps({ selectedOption: '2'})
    expect(wrapper.find('select').node.value).toBe('2');
  })

  it('should inherit name from props when content changes', () => {
    wrapper.setProps({name: 'Name'});
    expect(wrapper.find('select')).toHaveProp('name', 'Name')
  })
})

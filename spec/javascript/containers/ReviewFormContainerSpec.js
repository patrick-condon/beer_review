import TextField from '../../../app/javascript/components/TextField';
import SelectField from '../../../app/javascript/components/SelectField';
import ReviewFormContainer from '../../../app/javascript/containers/ReviewFormContainer';

describe('ReviewFormContainer', () => {
  let wrapper,
  handleFormSubmit,
  addNewReview;

  beforeEach(() => {
    addNewReview = jasmine.createSpy('addNewReview spy')
    spyOn(ReviewFormContainer.prototype, 'handleFormSubmit').and.callThrough();

    wrapper = mount(<ReviewFormContainer
      addNewReview={addNewReview}
      beer_id='1'
      user_id='1'
    />
    )
  })

  it('should have the specified initial state', () => {
    expect(wrapper.state()).toEqual({
      reviewBody: '',
      rating: '',
      ratingOptions: [0.0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0,
      2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0],
      errors: {}
    })
  })

  it('should display a TextField object', () => {
    expect(wrapper.find(TextField)).toBePresent()
  })

  it('should display a SelectField object', () => {
    expect(wrapper.find(SelectField)).toBePresent()
  })

  it('should transfer the text props to the fields from state', () => {
    wrapper.setState({ reviewBody: 'A Review' })
    expect(wrapper.find(TextField)).toHaveProp('content', 'A Review')
  })

  it('should transfer the rating props from state', () => {
    wrapper.setState({ rating: 'A Review' })
    expect(wrapper.find(SelectField)).toHaveProp('selectedOption', 'A Review')
  })

  it('should trigger handleFormSubmit and addNewReview on submission', () => {
    wrapper.setState({ reviewBody: 'A Review', rating: 4.0 })
    wrapper.find('form').simulate('submit');
    expect(ReviewFormContainer.prototype.handleFormSubmit).toHaveBeenCalled()
    expect(addNewReview).toHaveBeenCalled()
  })

  it('should not submit with empty fields', () => {
    wrapper.find('form').simulate('submit');
    expect(addNewReview).not.toHaveBeenCalled()
  })
})

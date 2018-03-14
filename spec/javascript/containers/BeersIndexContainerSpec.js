import BeerTile from '../../../app/javascript/components/BeerTile';
import BeersIndexContainer from '../../../app/javascript/containers/BeersIndexContainer';
// import BeerFormContainer from '../../src/containers/BeerFormContainer'
import 'isomorphic-fetch'

describe('BeersIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    // spyOn(BeersIndexContainer.prototype, 'addNewBeer').and.callThrough();
    // let data = [
    //     {
    //       id: 1,
    //       name: "Murphy's",
    //       style: 'Dry Stout'
    //     }
    //   ]
    // let responseBody = JSON.stringify(data);
    // let response = new Response(responseBody, {
    //   status: 200,
    //   statusText: 'OK',
    //   headers: { 'Content-Type': 'application/json' }
    // });
    // let responsePromise = Promise.resolve(response);
    // spyOn(global, 'fetch').and.returnValue(responsePromise);
    //

    wrapper = mount(<BeersIndexContainer />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      beers: []
    })
  })

  it('should display an h1', () => {
    expect(wrapper.find('h1')).toBePresent()
  })

  // it('should display an BeerFormContainer', () => {
  //   expect(wrapper.find(BeerFormContainer)).toBePresent()
  // })

  // it('should display an li', done => {
  //   setTimeout(() => {
  //     expect(wrapper.find('li')).toBePresent()
  //     done()
  //   },0)
  // })
  //
  // it('should display text from the fetch response', done => {
  //   setTimeout(() => {
  //     expect(wrapper.find('li')).toIncludeText("Murphy's: Dry Stout");
  //     done()
  //   },0)
  // })

  // it('should trigger addNewBeer when submitting a new beer', done => {
  //   setTimeout(() => {
  //     let submission = {title: 'a title', body: 'a body'}
  //     wrapper.find(BeerFormContainer).props().addNewBeer(submission)
  //     expect(BeersIndexContainer.prototype.addNewBeer).toHaveBeenCalled()
  //     done()
  //   },0)
  // })

})

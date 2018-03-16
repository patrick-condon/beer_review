import React, { Component } from 'react';
import UserShow from '../components/UserShow';


class UserShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = { user: {} }
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/users/${id}.json`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ user: body.user });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let photosrc = "/uploads/profile_pics/"
    let profile_photo = "https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg";

    if (this.state.user.profile_photo != null) {
      profile_photo = this.state.user.profile_photo
    }

    return(
      <UserShow
        key={this.state.user.id}
        email={this.state.user.email}
        username={this.state.user.username}
        profile_photo={profile_photo}
      />
    )
  }
}

export default UserShowContainer;

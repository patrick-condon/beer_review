require 'spec_helper'
require 'rails_helper'

describe Review, type: :model do
  it { should have_valid(:beer_id).when(1) }
  it { should_not have_valid(:beer_id).when(nil, '') }

  it { should have_valid(:body).when('this is great!') }
  it { should_not have_valid(:body).when(nil, '') }

  it { should have_valid(:rating).when(4) }
  it { should_not have_valid(:rating).when(nil, '') }

  it { should have_valid(:vote_score).when(0) }
  it { should_not have_valid(:vote_score).when(nil, '') }

  it { should have_valid(:user_id).when(1) }
  it { should_not have_valid(:user_id).when(nil, '') }
end

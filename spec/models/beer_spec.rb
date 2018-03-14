require 'spec_helper'
require 'rails_helper'

describe Beer, type: :model do
  it { should have_valid(:beer_name).when('Miller lite') }
  it { should_not have_valid(:beer_name).when(nil, '') }

  it { should have_valid(:brewery_name).when('Coors') }
  it { should_not have_valid(:brewery_name).when(nil, '') }

  it { should have_valid(:beer_style).when('American Pilsner') }
  it { should_not have_valid(:beer_style).when(nil, '') }

  it { should have_valid(:beer_abv).when(4.2) }
  it { should_not have_valid(:beer_abv).when(nil, '') }
end

require 'rails_helper'

RSpec.describe Registration, :type => :model do
    describe "Associations" do
        it { should belong_to(:tournament) }
        it { should belong_to(:player) }
    end

    describe "Validations" do
        it { should validate_presence_of(:tournament) }
        it { should validate_presence_of(:player) }
    end
end

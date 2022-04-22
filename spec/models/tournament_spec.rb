require 'rails_helper'

RSpec.describe Tournament, :type => :model do
    subject {
        described_class.new(name: "Tournament Name",
                            course_name: "Foobar Golf Club",
                            event_date: Date.today)
    }

    it "is valid with valid attributes" do
        expect(subject).to be_valid
    end

    it "is not valid without a name" do
        subject.name = nil
        expect(subject).to_not be_valid
    end

    it "is not valid with a too short name" do
        subject.name = "T"
        expect(subject).to_not be_valid
    end

    it "is not valid with a too long name" do
        subject.name = "Tournament Name Tournament Name Tournament Name Tournament Name Tournament Name Tournament Name Tourn"
        expect(subject).to_not be_valid
    end

    it "is not valid without a course name" do
        subject.course_name = nil
        expect(subject).to_not be_valid
    end

    it "is not valid with a too short course name" do
        subject.course_name = "F"
        expect(subject).to_not be_valid
    end

    it "is not valid with a too long course name" do
        subject.course_name = "Foobar Golf ClubFoobar Golf ClubFoobar Golf ClubFoobar Golf ClubFoobar Golf ClubFoobar Golf Clubxxxxx"
        expect(subject).to_not be_valid
    end

    it "is not valid without a date" do
        subject.event_date = nil
        expect(subject).to_not be_valid
    end

end

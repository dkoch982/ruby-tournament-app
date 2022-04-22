require 'rails_helper'

RSpec.describe Player, :type => :model do
    subject {
        described_class.new(first_name: "Happy",
                            last_name: "Gilmore",
                            postal_code: "99999",
                            handicap: 0)
    }

    it "is valid with valid attributes" do
        expect(subject).to be_valid
    end

    it "is not valid without a first name" do
        subject.first_name = nil
        expect(subject).to_not be_valid
    end

    it "is not valid with a too short first name" do
        subject.first_name = "H"
        expect(subject).to_not be_valid
    end

    it "is not valid with a too long first name" do
        subject.first_name = "HappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyHappyH"
        expect(subject).to_not be_valid
    end

    it "is not valid without a last name" do
        subject.last_name = nil
        expect(subject).to_not be_valid
    end

    it "is not valid with a too short last name" do
        subject.last_name = "G"
        expect(subject).to_not be_valid
    end

    it "is not valid with a too long last name" do
        subject.last_name = "GilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGilmoreGil"
        expect(subject).to_not be_valid
    end

    it "is not valid without a postal code" do
        subject.postal_code = nil
        expect(subject).to_not be_valid
    end

    it "is not valid with a too short postal code" do
        subject.postal_code = "9999"
        expect(subject).to_not be_valid
    end

    it "is not valid with a too long postal code" do
        subject.postal_code = "999999"
        expect(subject).to_not be_valid
    end

    it "is not valid without a handicap" do
        subject.handicap = nil
        expect(subject).to_not be_valid
    end

    it "is not valid with a too low handicap" do
        subject.handicap = -11
        expect(subject).to_not be_valid
    end

    it "is not valid with a too high handicap" do
        subject.handicap = 51
        expect(subject).to_not be_valid
    end

end

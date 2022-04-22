class Registration < ApplicationRecord
    belongs_to :tournament
    belongs_to :player

    validates :registration_date, presence: true
    validates_presence_of :tournament, :player
end

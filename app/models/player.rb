class Player < ApplicationRecord
    has_many :registrations
    has_many :tournaments, through: :registrations

    validates :first_name, presence: true, length: { minimum: 2, maximum: 100 }
    validates :last_name, presence: true, length: { minimum: 2, maximum: 100 }
    validates :postal_code, presence: true, length: { minimum: 5, maximum: 5 }
    validates :handicap, presence: true
    validates_inclusion_of :handicap, :in => -10..50
end

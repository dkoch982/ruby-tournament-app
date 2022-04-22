class Tournament < ApplicationRecord
    has_many :registrations
    has_many :players, through: :registrations

    validates :name, presence: true, length: { minimum: 2, maximum: 100 }
    validates :course_name, presence: true, length: { minimum: 2, maximum: 100 }
    validates :event_date, presence: true
end

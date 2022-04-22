json.extract! tournament, :id, :name, :course_name, :event_date, :created_at, :updated_at
json.url tournament_url(tournament, format: :json)

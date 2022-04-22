json.extract! player, :id, :first_name, :last_name, :postal_code, :handicap, :created_at, :updated_at
json.url player_url(player, format: :json)

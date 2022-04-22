# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Tournament.create(name: "Arizona Scorcher Scramble", course_name: "Las Sendas Golf Club", event_date: "2022-05-21")
Tournament.create(name: "Halloween Children's Scramble", course_name: "Pumpkin Ridge Golf Club", event_date: "2022-10-31")
Tournament.create(name: "The Links Classic", course_name: "Some Other Golf Club", event_date: "2022-05-21")
Tournament.create(name: "Military Appreciation Tournament", course_name: "The Dunes Golf Club", event_date: "2022-06-04")
Tournament.create(name: "Random Charitable Event", course_name: "Not A Real Golf Club", event_date: "2022-05-21")

Player.create(first_name: "Sterling", last_name: "Archer", postal_code: 99007, handicap: -10)
Player.create(first_name: "Lana", last_name: "Kane", postal_code: 99006, handicap: -3)
Player.create(first_name: "Kevin", last_name: "Bacon", postal_code: 55007, handicap: 4)
Player.create(first_name: "George", last_name: "Lucas", postal_code: 54637, handicap: 12)
Player.create(first_name: "Rodney", last_name: "Dangerfield", postal_code: 34057, handicap: 0)

Registration.create(tournament_id: 1, player_id: 1, registration_date: "2022-04-20")
Registration.create(tournament_id: 2, player_id: 1, registration_date: "2022-04-20")
Registration.create(tournament_id: 1, player_id: 2, registration_date: "2022-04-20")

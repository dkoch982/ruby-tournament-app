require "rails_helper"

RSpec.describe "Api::V1::Tournaments", type: :request do

    describe "POST /tournaments" do

        scenario "valid tournament" do
            post "/api/v1/tournaments", params: {
                tournament: {
                    name: "Test Tournament",
                    course_name: "Test Country Club",
                    event_date: Date.tomorrow
                }
            }
            expect(response.status).to eq(201)

            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json[:name]).to eq("Test Tournament")
            expect(json[:course_name]).to eq("Test Country Club")
            expect(json[:event_date]).to eq(Date.tomorrow.to_s)
        end

        scenario "missing name" do
            post "/api/v1/tournaments", params: {
                tournament: {
                    name: nil,
                    course_name: "Test Country Club",
                    event_date: Date.tomorrow
                }
            }
            expect(response.status).to eq(400)
            json = JSON.parse(response.body)
            expect(json["message"]).to eq("Name can't be blank")
        end

        scenario "invalid date" do
            post "/api/v1/tournaments", params: {
                tournament: {
                    name: "Test Tournament",
                    course_name: "Test Country Club",
                    event_date: Date.yesterday
                }
            }
            expect(response.status).to eq(400)
        end

    end

    describe "GET /tournaments/1" do

        let!(:tournament) { Tournament.create(name: "Test Tournament", course_name: "Test Country Club", event_date: Date.tomorrow) }

        scenario "tournament exists" do
            get "/api/v1/tournaments/#{tournament.id}"
            expect(response.status).to eq(200)

            json = JSON.parse(response.body).deep_symbolize_keys
            expect(json[:name]).to eq("Test Tournament")
            expect(json[:course_name]).to eq("Test Country Club")
            expect(json[:event_date]).to eq(Date.tomorrow.to_s)
        end

        scenario "tournament does not exist" do
            get "/api/v1/tournaments/0"
            expect(response.status).to eq(404)
            json = JSON.parse(response.body)
            expect(json["message"]).to eq("Tournament not found")
        end

    end

end

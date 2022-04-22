# README
### Author: Dan Koch

Build image:
- run `docker compose build`

Start application:
- run `docker compose up`

Stop application:
- run `docker compose down`

View the application:
- Navigate to `http://localhost:3000`

Open shell in container:
- run `docker compose exec web sh`

Run the RSpec tests:
- run `docker compose exec web bundle exec rspec spec/`

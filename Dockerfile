FROM ruby:alpine as base

RUN apk add --update build-base sqlite-dev tzdata git nodejs npm yarn 
RUN gem install rails -v '6.1.5'

WORKDIR /app

ADD Gemfile Gemfile.lock /app/

RUN bundle install

FROM base as dev

WORKDIR /app

RUN rails db:drop
RUN rails db:create
RUN rails db:migrate
RUN rails db:seed

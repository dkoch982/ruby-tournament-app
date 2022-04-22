Rails.application.routes.draw do
    namespace :api do
        namespace :v1 do
            get 'tournaments', to: 'tournaments#index'
            get 'tournaments/:id', to: 'tournaments#show'
            post 'tournaments', to: 'tournaments#create'
            put 'tournaments/:id', to: 'tournaments#update'
            delete 'tournaments/:id', to: 'tournaments#destroy'
            get 'tournaments/:id/players', to: 'tournaments#getRegisteredPlayers'

            get 'players', to: 'players#index'
            get 'players/:id', to: 'players#show'
            post 'players', to: 'players#create'
            put 'players/:id', to: 'players#update'
            delete 'players/:id', to: 'players#destroy'
            get 'players/:id/tournaments', to: 'players#getPlayerTournaments'
        end
    end

    root "tournaments#index"
    get "*path", to: "tournaments#index"
end

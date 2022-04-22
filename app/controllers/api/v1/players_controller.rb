class Api::V1::PlayersController < ApplicationController
    before_action :set_player, only: [:show, :update, :destroy, :getPlayerTournaments]
    before_action :validate_player, only:[:create]

    # GET /players
    def index
        @players = Player.all
        render json: @players
    end

    # GET /players/1
    def show
        if @player
            render json: @player
        else
            render json: @player.errors
        end
    end

    # POST /players
    def create
        if @player.save
            render json: @player
        else
            render json: @player.errors
        end
    end

    # PATCH/PUT /players/1
    def update
        if @player.update(player_params)
            render json: @player
        else
            render json: @player.errors
        end
    end

    # DELETE /players/1
    def destroy
        @player.destroy

        render json: { message: 'Player was successfully removed.' }
    end

    # GET /players/1/tournaments
    def getPlayerTournaments
        unless @player
            render json: @player.errors
        end
        @player_tournaments = Player.find(params[:id]).tournaments
        render json: @player_tournaments
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_player
            begin
                @player = Player.find(params[:id])
            rescue
                render json: { message: 'Player not found' }, status: :not_found
            end
        end
    
        # Only allow a list of trusted parameters through.
        def player_params
            params.require(:player).permit(:first_name, :last_name, :handicap, :postal_code)
        end

        def validate_player
            @player = Player.new(player_params)
            unless @player.valid?
                render json: { error: @player.errors.objects.first.full_message }, status: :bad_request
            end
        end
end

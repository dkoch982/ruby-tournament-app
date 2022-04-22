class Api::V1::TournamentsController < ApplicationController
    before_action :set_tournament, only: [:show, :update, :destroy, :getRegisteredPlayers]
    before_action :validate_new_tournament, only:[:create]

    # GET /tournaments
    def index
        @tournaments = Tournament.all
        if params[:event_date].present?
            begin
                tournament_date = Date.parse(params[:event_date])
                @tournaments = Tournament.where(event_date: tournament_date)
            rescue
                puts "unable to parse search date"
            end
        end
        render json: @tournaments
    end

    # GET /tournament/1
    def show
        if @tournament
            render json: @tournament
        else
            render json: @tournament.errors
        end
    end

    # POST /tournaments
    def create
        if @tournament.save
            render json: @tournament, status: :created
        else
            render json: @tournament.errors
        end
    end

    # PATCH/PUT /tournaments/1
    def update
        if @tournament.update(tournament_params)
            render json: @tournament
        else
            render json: @tournament.errors
        end
    end

    # DELETE /tournaments/1
    def destroy
        @tournament.destroy

        render json: { message: 'Tournament was successfully removed.' }
    end

    # GET /tournaments/1/players
    def getRegisteredPlayers
        unless @tournament
            render json: @tournament.errors
        end
        @registered_players = Tournament.find(params[:id]).players
        render json: @registered_players
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_tournament
            begin
                @tournament = Tournament.find(params[:id])
            rescue
                render json: { message: 'Tournament not found' }, status: :not_found
            end
        end
    
        # Only allow a list of trusted parameters through.
        def tournament_params
            params.require(:tournament).permit(:name, :course_name, :event_date)
        end

        def validate_new_tournament
            @tournament = Tournament.new(tournament_params)
            if !@tournament.valid? || @tournament.event_date.before?(Date.today)
                render json: { message: @tournament.errors.full_messages.first }, status: :bad_request
            end
        end
end

class CreateRegistrations < ActiveRecord::Migration[6.1]
  def change
    create_table :registrations do |t|
      t.references :tournament, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true
      t.date :registration_date, null: false

      t.timestamps
    end
  end
end

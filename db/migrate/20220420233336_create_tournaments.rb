class CreateTournaments < ActiveRecord::Migration[6.1]
  def change
    create_table :tournaments do |t|
      t.string :name
      t.string :course_name
      t.date :event_date

      t.timestamps
    end
  end
end

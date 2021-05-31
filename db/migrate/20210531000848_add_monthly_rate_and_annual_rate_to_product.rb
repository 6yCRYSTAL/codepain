class AddMonthlyRateAndAnnualRateToProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :monthly_rate, :integer
    add_column :products, :annual_rate, :integer
    add_column :products, :subtitle, :string
  end
end

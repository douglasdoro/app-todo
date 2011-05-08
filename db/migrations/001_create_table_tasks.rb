Sequel.migration do
    up do
        create_table(:tasks) do
            primary_key :id
            String      :description, :null => false
            TrueClass   :complete, :default => false
            DateTime    :date, :null => false
        end
    end

    down do
        drop_table(:tasks)
    end
end


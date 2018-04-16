defmodule Cryptoloan.Notifications.Notification do
  use Ecto.Schema
  import Ecto.Changeset


  schema "notifications" do
    field :bclimit, :integer
    field :etlimit, :integer
    field :lclimit, :integer
    field :balert, :boolean, default: false
    field :lalert, :boolean, default: false
    field :ealert, :boolean, default: false
    belongs_to :user, Cryptoloan.Users.User

    timestamps()
  end

  @doc false
  def changeset(notification, attrs) do
    notification
    |> cast(attrs, [:bclimit, :lclimit, :etlimit, :user_id, :balert, :lalert, :ealert])
    |> validate_required([:bclimit, :lclimit, :etlimit, :user_id, :balert, :lalert, :ealert])
  end
end

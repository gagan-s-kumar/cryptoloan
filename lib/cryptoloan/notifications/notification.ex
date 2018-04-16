defmodule Cryptoloan.Notifications.Notification do
  use Ecto.Schema
  import Ecto.Changeset


  schema "notifications" do
    field :alert_sent, :boolean, default: false
    field :bclimit, :integer
    field :etlimit, :integer
    field :lclimit, :integer
    belongs_to :user, Cryptoloan.Users.User

    timestamps()
  end

  @doc false
  def changeset(notification, attrs) do
    notification
    |> cast(attrs, [:bclimit, :lclimit, :etlimit, :alert_sent, :user_id])
    |> validate_required([:bclimit, :lclimit, :etlimit, :alert_sent, :user_id])
  end
end

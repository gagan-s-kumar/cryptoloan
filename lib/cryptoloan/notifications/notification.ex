defmodule Cryptoloan.Notifications.Notification do
  use Ecto.Schema
  import Ecto.Changeset


  schema "notifications" do
    field :alert_sent, :boolean, default: false
    field :bclimit, :integer
    field :bitcoin, :boolean, default: false
    field :ethereum, :boolean, default: false
    field :etlimit, :integer
    field :lclimit, :integer
    field :litecoin, :boolean, default: false
    belongs_to :user, Cryptoloan.Users.User

    timestamps()
  end

  @doc false
  def changeset(notification, attrs) do
    notification
    |> cast(attrs, [:bitcoin, :litecoin, :ethereum, :bclimit, :lclimit, :etlimit, :alert_sent, :user_id])
    |> validate_required([:bitcoin, :litecoin, :ethereum, :bclimit, :lclimit, :etlimit, :alert_sent, :user_id])
  end
end

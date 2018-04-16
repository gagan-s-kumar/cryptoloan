defmodule CryptoloanWeb.NotificationView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.NotificationView
  alias CryptoloanWeb.UserView

  def render("index.json", %{notifications: notifications}) do
    %{data: render_many(notifications, NotificationView, "notification.json")}
  end

  def render("show.json", %{notification: notification}) do
    %{data: render_one(notification, NotificationView, "notification.json")}
  end

  def render("notification.json", %{notification: notification}) do
    %{id: notification.id,
      bclimit: notification.bclimit,
      lclimit: notification.lclimit,
      etlimit: notification.etlimit,
      balert: notification.balert,
      lalert: notification.lalert,
      ealert: notification.ealert,
      user_id: render_one(notification.user, UserView, "user.json")}
  end
end

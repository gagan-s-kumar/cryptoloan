defmodule CryptoloanWeb.NotificationView do
  use CryptoloanWeb, :view
  alias CryptoloanWeb.NotificationView

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
      alert_sent: notification.alert_sent}
  end
end

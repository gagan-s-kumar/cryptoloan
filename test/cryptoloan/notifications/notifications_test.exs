defmodule Cryptoloan.NotificationsTest do
  use Cryptoloan.DataCase

  alias Cryptoloan.Notifications

  describe "notifications" do
    alias Cryptoloan.Notifications.Notification

    @valid_attrs %{alert_sent: true, bclimit: 42, bitcoin: true, ethereum: true, etlimit: 42, lclimit: 42, litecoin: true}
    @update_attrs %{alert_sent: false, bclimit: 43, bitcoin: false, ethereum: false, etlimit: 43, lclimit: 43, litecoin: false}
    @invalid_attrs %{alert_sent: nil, bclimit: nil, bitcoin: nil, ethereum: nil, etlimit: nil, lclimit: nil, litecoin: nil}

    def notification_fixture(attrs \\ %{}) do
      {:ok, notification} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Notifications.create_notification()

      notification
    end

    test "list_notifications/0 returns all notifications" do
      notification = notification_fixture()
      assert Notifications.list_notifications() == [notification]
    end

    test "get_notification!/1 returns the notification with given id" do
      notification = notification_fixture()
      assert Notifications.get_notification!(notification.id) == notification
    end

    test "create_notification/1 with valid data creates a notification" do
      assert {:ok, %Notification{} = notification} = Notifications.create_notification(@valid_attrs)
      assert notification.alert_sent == true
      assert notification.bclimit == 42
      assert notification.bitcoin == true
      assert notification.ethereum == true
      assert notification.etlimit == 42
      assert notification.lclimit == 42
      assert notification.litecoin == true
    end

    test "create_notification/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Notifications.create_notification(@invalid_attrs)
    end

    test "update_notification/2 with valid data updates the notification" do
      notification = notification_fixture()
      assert {:ok, notification} = Notifications.update_notification(notification, @update_attrs)
      assert %Notification{} = notification
      assert notification.alert_sent == false
      assert notification.bclimit == 43
      assert notification.bitcoin == false
      assert notification.ethereum == false
      assert notification.etlimit == 43
      assert notification.lclimit == 43
      assert notification.litecoin == false
    end

    test "update_notification/2 with invalid data returns error changeset" do
      notification = notification_fixture()
      assert {:error, %Ecto.Changeset{}} = Notifications.update_notification(notification, @invalid_attrs)
      assert notification == Notifications.get_notification!(notification.id)
    end

    test "delete_notification/1 deletes the notification" do
      notification = notification_fixture()
      assert {:ok, %Notification{}} = Notifications.delete_notification(notification)
      assert_raise Ecto.NoResultsError, fn -> Notifications.get_notification!(notification.id) end
    end

    test "change_notification/1 returns a notification changeset" do
      notification = notification_fixture()
      assert %Ecto.Changeset{} = Notifications.change_notification(notification)
    end
  end
end

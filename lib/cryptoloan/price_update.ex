  defmodule Cryptoloan.BitcoinPriceUpdater do
  use Task
  alias Cryptoloan.Email
  alias Cryptoloan.Mailer
  alias Cryptoloan.Repo
  alias Cryptoloan.Notifications.Notification
  alias Cryptoloan.Loans
  alias Cryptoloan.Wallets
  alias Cryptoloan.Requestedloans

  def start_link(_arg) do
    Task.start_link(&poll/0)
    Task.start_link(&poll1/0)
  end

  def poll1 do
    receive do
    after
      86400_000 ->
        reset_alerts()
        poll1()
    end
  end

  def poll() do
    receive do
    after
      60_000 ->
        get_price_bitcoin()
        get_price_litecoin()
        get_price_ethereum()
        resolve_collateral()
        poll()
    end
  end

  def reset_alerts do
    IO.puts "resetting"
    rst = Cryptoloan.Notifications.list_notifications
    reset1 = Enum.map(rst, fn(b) -> Cryptoloan.Notifications.update_notification(b, %{balert: false, lalert: false, ealert: false}) end)
  end

  defp get_price_bitcoin() do
    # Call API & Persist
    resp = get_spot_price_bitcoin()
    resp = String.to_float(resp)
    #IO.puts "Bitcoin amount:"
    #IO.inspect resp
    list = Cryptoloan.Notifications.list_notifications
    #IO.inspect list
    lst = Enum.filter(list, fn(z) -> z.balert == false end)
    list1 = Enum.filter(lst, fn(x) -> x.bclimit > resp end)
    #IO.inspect list1
    set1 = Enum.map(list1, fn(a) -> Cryptoloan.Notifications.update_notification(a, %{balert: true}) end)
    mail1 = Enum.map(list1, fn(y) -> Cryptoloan.Email.bitcoin_text_email(y.user.email, resp)|> Mailer.deliver_now end)
    #Cryptoloan.Email.welcome_text_email("naomimachado21@gmail.com", resp)
    #|> Mailer.deliver_now
  end

  def get_spot_price_bitcoin() do
    resp = HTTPoison.get!("https://api.coinbase.com/v2/prices/BTC-USD/spot")
    body = Poison.decode!(resp.body)
    body["data"]["amount"]
  end

  defp get_price_litecoin() do
    # Call API & Persist
    resp = get_spot_price_litecoin()
    resp = String.to_float(resp)
    #IO.puts "Litecoin amount:"
    #IO.inspect resp
    list = Cryptoloan.Notifications.list_notifications
    lst = Enum.filter(list, fn(z) -> z.lalert == false end)
    #IO.inspect lst
    #IO.inspect "after filter"
    list1 = Enum.filter(lst, fn(x) -> x.lclimit > resp end)
    #IO.inspect list1
    set1 = Enum.map(list1, fn(a) -> Cryptoloan.Notifications.update_notification(a, %{lalert: true}) end)
    mail1 = Enum.map(list1, fn(y) -> Cryptoloan.Email.litecoin_text_email(y.user.email, resp)|> Mailer.deliver_now end)
    #Cryptoloan.Email.welcome_text_email("naomimachado21@gmail.com", resp)
    #|> Mailer.deliver_now
  end

  def get_spot_price_litecoin() do
    resp = HTTPoison.get!("https://api.coinbase.com/v2/prices/LTC-USD/spot")
    body = Poison.decode!(resp.body)
    body["data"]["amount"]
  end

  defp get_price_ethereum() do
    # Call API & Persist
    resp = get_spot_price_ethereum()
    resp = String.to_float(resp)
    #IO.puts "Ethereum amount:"
    #IO.inspect resp
    list = Cryptoloan.Notifications.list_notifications
    #IO.inspect list
    lst = Enum.filter(list, fn(z) -> z.ealert == false end)
    list1 = Enum.filter(lst, fn(x) -> x.etlimit > resp end)
    #IO.inspect list1
    set1 = Enum.map(list1, fn(a) -> Cryptoloan.Notifications.update_notification(a, %{ealert: true}) end)
    mail1 = Enum.map(list1, fn(y) -> Cryptoloan.Email.ethereum_text_email(y.user.email, resp)|> Mailer.deliver_now end)
    #Cryptoloan.Email.welcome_text_email("naomimachado21@gmail.com", resp)
    #|> Mailer.deliver_now
  end

  defp resolve_collateral() do
    Enum.each Loans.list_loans(), fn(loan) ->
      requester_loan_details = Requestedloans.get_requestedloan!(loan.requestedloan_id)
      
      user_wallet = Cryptoloan.Wallets.get_user_wallet(requester_loan_details.user_id) 
      if loan.colletaral >= 0 do
        if user_wallet && user_wallet.currency == "BTC" do
          btc_to_usd = get_spot_price_bitcoin()
          usd_amount  = user_wallet.balance * String.to_float(btc_to_usd)
          IO.inspect usd_amount
          if usd_amount < loan.colletaral do
            IO.inspect "Transacting"
            lender_id = loan.user_id
            requester_id = requester_loan_details.user_id
            amount = user_wallet.balance
            headers = [{"Content-type", "application/json"}]
            {status, response} = HTTPoison.post("demo.purneshdixit.stream/api/v1/wallets/user/send_bitcoin", 
		JSON.encode!(%{"sender_id" => requester_id, "receiver_id" => lender_id, "amount" => 0.0012}), headers, [])
            if response and user_wallet.balance - 0.0012 <= 0 do
              Loans.update_loan(loan, %{completed: true})
            end
          end
        end
      end
    end
  end

  def get_spot_price_ethereum() do
    resp = HTTPoison.get!("https://api.coinbase.com/v2/prices/ETH-USD/spot")
    body = Poison.decode!(resp.body)
    body["data"]["amount"]
  end
end

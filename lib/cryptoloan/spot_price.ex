  defmodule Cryptoloan.SpotPrice do
  use Task
  alias Cryptoloan.Email
  alias Cryptoloan.Mailer
  alias Cryptoloan.Repo
  alias Cryptoloan.Notifications.Notification
  alias Cryptoloan.Loans
  alias Cryptoloan.Wallets
  alias Cryptoloan.Requestedloans
  alias Cryptoloan.Users

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
    resp = get_spot_price_bitcoin()
    resp = String.to_float(resp)
    list = Cryptoloan.Notifications.list_notifications
    lst = Enum.filter(list, fn(z) -> z.balert == false end)
    list1 = Enum.filter(lst, fn(x) -> x.bclimit > resp end)
    set1 = Enum.map(list1, fn(a) -> Cryptoloan.Notifications.update_notification(a, %{balert: true}) end)
    mail1 = Enum.map(list1, fn(y) -> Cryptoloan.Email.bitcoin_text_email(y.user.email, resp)|> Mailer.deliver_now end)
  end

  def get_spot_price_bitcoin() do
    resp = HTTPoison.get!("https://api.coinbase.com/v2/prices/BTC-USD/spot")
    body = Poison.decode!(resp.body)
    body["data"]["amount"]
  end

  defp get_price_litecoin() do
    resp = get_spot_price_litecoin()
    resp = String.to_float(resp)
    list = Cryptoloan.Notifications.list_notifications
    lst = Enum.filter(list, fn(z) -> z.lalert == false end)
    list1 = Enum.filter(lst, fn(x) -> x.lclimit > resp end)
    set1 = Enum.map(list1, fn(a) -> Cryptoloan.Notifications.update_notification(a, %{lalert: true}) end)
    mail1 = Enum.map(list1, fn(y) -> Cryptoloan.Email.litecoin_text_email(y.user.email, resp)|> Mailer.deliver_now end)
  end

  def get_spot_price_litecoin() do
    resp = HTTPoison.get!("https://api.coinbase.com/v2/prices/LTC-USD/spot")
    body = Poison.decode!(resp.body)
    body["data"]["amount"]
  end

  defp get_price_ethereum() do
    resp = get_spot_price_ethereum()
    resp = String.to_float(resp)
    list = Cryptoloan.Notifications.list_notifications
    lst = Enum.filter(list, fn(z) -> z.ealert == false end)
    list1 = Enum.filter(lst, fn(x) -> x.etlimit > resp end)
    set1 = Enum.map(list1, fn(a) -> Cryptoloan.Notifications.update_notification(a, %{ealert: true}) end)
    mail1 = Enum.map(list1, fn(y) -> Cryptoloan.Email.ethereum_text_email(y.user.email, resp)|> Mailer.deliver_now end)
  end

  def get_spot_price_ethereum() do
    resp = HTTPoison.get!("https://api.coinbase.com/v2/prices/ETH-USD/spot")
    body = Poison.decode!(resp.body)
    body["data"]["amount"]
  end

  defp resolve_collateral() do
    btc_to_usd = get_spot_price_bitcoin()
    Enum.each Loans.list_loans(), fn(loan) ->
      requester_loan_details = Requestedloans.get_requestedloan!(loan.requestedloan_id)
      min_btc = 1.0/String.to_float(btc_to_usd)
      min_btc = Float.floor(min_btc, 4)
      user_wallet = Cryptoloan.Wallets.get_user_wallet(requester_loan_details.user_id)
      if !loan.completed && loan.accepted do
        if user_wallet && user_wallet.currency == "BTC" && user_wallet.balance >= min_btc do
          usd_amount  = user_wallet.balance * String.to_float(btc_to_usd)
          cur_time = DateTime.utc_now()
          requested_time = DateTime.from_naive!(requester_loan_details.duration_requested, "Etc/UTC")
          if usd_amount < loan.colletaral || DateTime.compare(cur_time, requested_time) == :gt do
            IO.inspect "Transacting"
            lender_id = loan.user_id
            requester_id = requester_loan_details.user_id
            amount = user_wallet.balance
            headers = [{"Content-type", "application/json"}]

            {status, response} = HTTPoison.post("cryptoloan.naomimachado.com/api/v1/wallets/user/send_bitcoin",
		JSON.encode!(%{"sender_id" => requester_id, "receiver_id" => lender_id, "amount" => min_btc}), headers, [])
            IO.inspect response
           #response=%{body: "123"}
           if response do
              min_usd = 1
              if  user_wallet.balance - min_btc < min_btc || loan.colletaral - min_usd <= 0 do
                if response.body != "" do
                  lender = Users.get_user!(loan.user_id)
                  borrower = Users.get_user!(requester_loan_details.user_id)
                  Users.update_user(borrower, %{loan_accepted: false})
                  Loans.update_loan(loan, %{completed: true, colletaral: 0})
                  Users.update_user(borrower, %{credit: 0})
                  Users.update_user(borrower, %{debit: (borrower.debit + requester_loan_details.amount)})
                  Users.update_user(lender, %{debit: (lender.debit + (loan.mini_balance - requester_loan_details.amount))})
                  #Loans.update_loan(loan, %{completed: true, colletaral: 0})
                  #Users.update_user(lender, %{debit: lender.debit + min_usd})
                  #Users.update_user(borrower, %{credit: borrower.credit - min_usd})
                  #Users.update_user(borrower, %{debit: borrower.debit + min_usd})
                  #Users.update_user(lender, %{debit: lender.debit + (loan.mini_balance - loan.requestedloan_id.amount)})
                  #Users.update_user(borrower, %{credit: 0})
                  #Users.update_user(borrower, %{debit: borrower.debit + loan.mini_balance})
                end
              else
                if response.body != "" do
                  Loans.update_loan(loan, %{colletaral: loan.colletaral - min_usd})
                  #lender = Users.get_user(loan.user_id.id)
                  #borrower = Users.get_user(loan.requestedloan_id.user_id.id)
                  #Users.update_user(lender, %{debit: lender.debit + min_usd})
                  #Users.update_user(borrower, %{credit: borrower.credit - min_usd})
                  #Users.update_user(borrower, %{debit: borrower.debit + min_usd})
                end
              end
            end
          end
        end
      end
    end
  end

end

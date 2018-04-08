# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Cryptoloan.Repo.insert!(%Cryptoloan.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Cryptoloan.Repo
  alias Cryptoloan.Users.User
  alias Cryptoloan.Notifications.Notification
  alias Cryptoloan.Requestedloans.Requestedloan
  alias Cryptoloan.Loans.Loan

  def run do
    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", wallet: 100, debit: 0, credit: 50 })
    b = Repo.insert!(%User{ name: "bob", email: "bob@gmail.com", wallet: 200, debit: 50, credit: 0})
    c = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", wallet: 50, debit: 0, credit: 0 })

    Repo.delete_all(Notification)
    Repo.insert!(%Notification{ user_id: a.id, bitcoin: true, litecoin: false, ethereum: true, bclimit: 10000, lclimit: 100, etlimit: 5000, alert_sent: false})

    Repo.delete_all(Requestedloan)
    k = Repo.insert!(%Requestedloan{user_id: b.id, amount: 200, duration_requested: nil, granted: false })

    Repo.delete_all(Loan)
    Repo.insert!(%Loan{ user_id: c.id, requestedloan_id: k.id, mini_balance: 1500, colletaral: 2500, accepted: false})

  end
end

Seeds.run

defmodule Cryptoloan.Email do
  use Bamboo.Phoenix, view: Cryptoloan.EmailView

  def bitcoin_text_email(to_email, value) do
    IO.inspect "sending mails"
    value = Float.to_string(value)
    send_string = "Current Bitcoin value " <> value
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("BitCoin Price Drop!")
    |> text_body(send_string)
  end

  def litecoin_text_email(to_email, value) do
    IO.puts "sending mails"
    IO.inspect to_email
    value = Float.to_string(value)
    send_string = "Current Litecoin value " <> value
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("LiteCoin Price Drop!")
    |> text_body(send_string)
  end

  def ethereum_text_email(to_email, value) do
    IO.puts "sending mails"
    IO.inspect to_email
    value = Float.to_string(value)
    send_string = "Current Ethereum value " <> value
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("Ethereum Price Drop!")
    |> text_body(send_string)
  end

end

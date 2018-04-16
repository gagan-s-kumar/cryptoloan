defmodule Cryptoloan.Email do
  use Bamboo.Phoenix, view: Cryptoloan.EmailView

  def bitcoin_text_email(to_email, value) do
    IO.puts "sending mails"
    IO.inspect to_email
    value = Float.to_string(value)
    send_string = "Bitcoin value " <> value
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("Asli value!")
    |> text_body(send_string)
  end

  def litecoin_text_email(to_email, value) do
    IO.puts "sending mails"
    IO.inspect to_email
    value = Float.to_string(value)
    send_string = "Litecoin value " <> value
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("Asli value!")
    |> text_body(send_string)
  end

  def ethereum_text_email(to_email, value) do
    IO.puts "sending mails"
    IO.inspect to_email
    value = Float.to_string(value)
    send_string = "Ethereum value " <> value
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("Asli value!")
    |> text_body(send_string)
  end

end

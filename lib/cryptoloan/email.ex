defmodule Cryptoloan.Email do
  use Bamboo.Phoenix, view: Cryptoloan.EmailView

  def welcome_text_email(to_email) do
    new_email
    |> to(to_email)
    |> from("bitcoinalertsend@gmail.com")
    |> subject("Welcome!")
    |> text_body("Welcome to MyApp!")
  end

end

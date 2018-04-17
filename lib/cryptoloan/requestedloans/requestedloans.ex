defmodule Cryptoloan.Requestedloans do
  @moduledoc """
  The Requestedloans context.
  """

  import Ecto.Query, warn: false
  alias Cryptoloan.Repo

  alias Cryptoloan.Requestedloans.Requestedloan

  @doc """
  Returns the list of requestedloans.

  ## Examples

      iex> list_requestedloans()
      [%Requestedloan{}, ...]

  """
  def list_requestedloans do
    Repo.all(Requestedloan)
    |>Repo.preload(:user)
  end

  @doc """
  Gets a single requestedloan.

  Raises `Ecto.NoResultsError` if the Requestedloan does not exist.

  ## Examples

      iex> get_requestedloan!(123)
      %Requestedloan{}

      iex> get_requestedloan!(456)
      ** (Ecto.NoResultsError)

  """
  def get_requestedloan!(id) do
     Repo.get!(Requestedloan, id)
     |> Repo.preload(:user)
   end

  @doc """
  Creates a requestedloan.

  ## Examples

      iex> create_requestedloan(%{field: value})
      {:ok, %Requestedloan{}}

      iex> create_requestedloan(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_requestedloan(attrs \\ %{}) do
    {:ok, requestedloan} = %Requestedloan{}
    |> Requestedloan.changeset(attrs)
    |> Repo.insert()
    {:ok, Repo.preload(requestedloan, :user)}
  end

  @doc """
  Updates a requestedloan.

  ## Examples

      iex> update_requestedloan(requestedloan, %{field: new_value})
      {:ok, %Requestedloan{}}

      iex> update_requestedloan(requestedloan, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_requestedloan(%Requestedloan{} = requestedloan, attrs) do
    requestedloan
    |> Requestedloan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Requestedloan.

  ## Examples

      iex> delete_requestedloan(requestedloan)
      {:ok, %Requestedloan{}}

      iex> delete_requestedloan(requestedloan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_requestedloan(%Requestedloan{} = requestedloan) do
    Repo.delete(requestedloan)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking requestedloan changes.

  ## Examples

      iex> change_requestedloan(requestedloan)
      %Ecto.Changeset{source: %Requestedloan{}}

  """
  def change_requestedloan(%Requestedloan{} = requestedloan) do
    Requestedloan.changeset(requestedloan, %{})
  end
end

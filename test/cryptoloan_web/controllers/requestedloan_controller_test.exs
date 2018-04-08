defmodule CryptoloanWeb.RequestedloanControllerTest do
  use CryptoloanWeb.ConnCase

  alias Cryptoloan.Requestedloans
  alias Cryptoloan.Requestedloans.Requestedloan

  @create_attrs %{amount: 42, duration_requested: ~N[2010-04-17 14:00:00.000000], granted: true}
  @update_attrs %{amount: 43, duration_requested: ~N[2011-05-18 15:01:01.000000], granted: false}
  @invalid_attrs %{amount: nil, duration_requested: nil, granted: nil}

  def fixture(:requestedloan) do
    {:ok, requestedloan} = Requestedloans.create_requestedloan(@create_attrs)
    requestedloan
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all requestedloans", %{conn: conn} do
      conn = get conn, requestedloan_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create requestedloan" do
    test "renders requestedloan when data is valid", %{conn: conn} do
      conn = post conn, requestedloan_path(conn, :create), requestedloan: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, requestedloan_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 42,
        "duration_requested" => ~N[2010-04-17 14:00:00.000000],
        "granted" => true}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, requestedloan_path(conn, :create), requestedloan: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update requestedloan" do
    setup [:create_requestedloan]

    test "renders requestedloan when data is valid", %{conn: conn, requestedloan: %Requestedloan{id: id} = requestedloan} do
      conn = put conn, requestedloan_path(conn, :update, requestedloan), requestedloan: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, requestedloan_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 43,
        "duration_requested" => ~N[2011-05-18 15:01:01.000000],
        "granted" => false}
    end

    test "renders errors when data is invalid", %{conn: conn, requestedloan: requestedloan} do
      conn = put conn, requestedloan_path(conn, :update, requestedloan), requestedloan: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete requestedloan" do
    setup [:create_requestedloan]

    test "deletes chosen requestedloan", %{conn: conn, requestedloan: requestedloan} do
      conn = delete conn, requestedloan_path(conn, :delete, requestedloan)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, requestedloan_path(conn, :show, requestedloan)
      end
    end
  end

  defp create_requestedloan(_) do
    requestedloan = fixture(:requestedloan)
    {:ok, requestedloan: requestedloan}
  end
end

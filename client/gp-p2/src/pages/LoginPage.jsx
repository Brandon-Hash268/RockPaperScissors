import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
  });

  //input handler
  function handleInput(e) {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  //login handler
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", form);
      localStorage.setItem("userName", data.user.userName);
      console.log(data)
      console.log("login success");
      navigate("/");
    } catch (err) {
      console.log("🚀 ~ handleLogin ~ err:", err);
      Swal.fire(err.response.data.message);
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="row w-75">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-2">Login to play Janken Game</h2>
              <p className="text-center small mb-0">じゃんけん</p>

              <form onSubmit={handleLogin}>
                <div className="form-group mb-3 m-2">
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    placeholder="Enter your username"
                    value={form.userName}
                    onChange={handleInput}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

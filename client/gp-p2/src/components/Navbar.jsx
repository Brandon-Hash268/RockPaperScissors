import axios from "axios";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [user, setUser] = useState("");
  console.log(id, " cek  id");

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        "https://jankenpon.alifnaufaldo.online/users/" +id
      );
      // console.log(data.win, "dataaaaaaa")
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        position: "fixed",
        zIndex: 60,
        backgroundColor: "#0b1b26",
      }}
      className="row px-3 py-2 align-items-center shadow-lg text-light"
    >
      <div className="d-flex justify-content-between">
        <div className="col-4">
          <img style={{ width: "64px" }} src={logo} alt="" />
        </div>

        <div className="d-flex justify-content-center gap-3 align-items-center">
          <h1 className="text-success">W : {user.win}</h1>
          <h1 className="text-danger">L : {user.lose}</h1>
        </div>

        <div className="d-flex justify-content-end col-4">
          <button
            onClick={logout}
            style={{ marginLeft: "10px" }}
            className="bg-danger p-3 rounded text-light"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

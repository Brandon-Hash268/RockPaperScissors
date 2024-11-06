import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../assets/RSP.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [form, setForm] = useState({
    userName: "",
  });

  // Handler input
  function handleInput(e) {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  // Handler login
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", form);
      localStorage.setItem("id", data.user.id);
      console.log(data);
      console.log("login success");
      navigate("/");
    } catch (err) {
      console.log("🚀 ~ handleLogin ~ err:", err);
      Swal.fire(err.response.data.message);
    }
  }

  // template text
  const texts = {
    en: {
      title: "Login to play",
      placeholder: "Enter your username",
      button: "Login",
      description: "Rock Paper Scissors",
    },
    jp: {
      title: "ログインしてプレイ",
      placeholder: "ユーザー名を入力",
      button: "ログイン",
      description: "じゃんけん",
    },
    fr: {
      title: "Connectez-vous pour jouer",
      placeholder: "Entrez votre nom d'utilisateur",
      button: "Se connecter",
      description: "Pierre Papier Ciseaux",
    },
    ar: {
      title: "قم بتسجيل الدخول للعب",
      placeholder: "أدخل اسم المستخدم",
      button: "تسجيل الدخول",
      description: "حجر ورقة مقص",
    },
    id: {
      title: "Masuk untuk bermain",
      placeholder: "Masukkan nama pengguna",
      button: "Masuk",
      description: "Batu Gunting Kertas",
    },
    jv: {
      title: "Melebu kanggo dolanan",
      placeholder: "Lebokke Jeneng Pelakon",
      button: "Melebu",
      description: "Batu Gunting Kertas",
    }
  };

  
  const selectedText = texts[language];

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="row w-75 d-flex justify-content-center align-items-center">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-2">
                {selectedText.title} <img src={logo} alt="logo" style={{ width: "50px" }} />
              </h2>
              <p className="text-center small mb-0">{selectedText.description}</p>

              {/* Form login */}
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3 m-2">
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    placeholder={selectedText.placeholder}
                    value={form.userName}
                    onChange={handleInput}
                    required
                  />
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    {selectedText.button}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 mb-3">
        <button className="btn btn-link" style={{color: 'white'}} onClick={() => setLanguage("en")}>English</button>
        <button className="btn btn-link" style={{color: 'white'}} onClick={() => setLanguage("jp")}>日本語</button>
        <button className="btn btn-link" style={{color: 'white'}} onClick={() => setLanguage("fr")}>Français</button>
        <button className="btn btn-link" style={{color: 'white'}} onClick={() => setLanguage("ar")}>العربية</button>
        <button className="btn btn-link" style={{color: 'white'}} onClick={() => setLanguage("id")}>Indonesia</button>
        <button className="btn btn-link" style={{color: 'white'}} onClick={() => setLanguage("jv")}>Jawa</button>
      </div>
    </div>
  );
}

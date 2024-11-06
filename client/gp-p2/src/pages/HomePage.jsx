import { useNavigate } from "react-router-dom";
import background from "../assets/Background_Space.webp";
import rsp from "../assets/RSP.png";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

const HomePage = () => {
  const navigate = useNavigate()
  const { language, setLanguage, texts } = useLanguage(); 
  const selectedText = texts[language]
  

  const play = () => {
    navigate("/battle");
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
        className="d-flex align-items-center position-relative justify-content-center"
      >
        <div
          style={{ width: "100%", maxWidth: "700px" }}
          className="bg-info rounded bg-opacity-50 p-5 text-white"
        >
          <div className="d-flex flex-row gap-3">
            <div>
              <h1
                style={{ fontSize: "48px" }}
                className="fw-bold font-monospace mb-5"
              >
                {selectedText.description}
              </h1>
              <button onClick={play} className="button-play">
              {selectedText.play}
              </button>
            </div>

            <div>
              <img
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
                src={rsp}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import background from "../assets/Background_Space.webp";
import rsp from "../assets/RSP.png";

const HomePage = () => {
  return (
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
              Rock <br />
              <span>Scissors</span> <br />
              <span>Paper</span>
            </h1>
            <button className="button-play">Play Game</button>
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
  );
};

export default HomePage;

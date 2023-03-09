import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiTempHigh } from "react-icons/ci";
import { BiWind } from "react-icons/bi";
import { BsClouds } from "react-icons/bs";
import FadeLoader from "react-spinners/FadeLoader";
import dateFormat, { masks } from "dateformat";
// import images
import sunny from "./assets/sunny.png";
import cloudy from "./assets/cloudy.png";
import rainy from "./assets/rainy.png";
import snow from "./assets/snow.png";
import overcast from "./assets/overcast.png";

// styling spinner
const override = {
  display: "block",
  margin: "0 auto",
  color: "#fff",
};

// api path
const api = `https://api.weatherapi.com/v1/current.json?key=20aaa760a34c49648a5104827230603`;

function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(false);
      const response = await fetch(`${api}&q=${location}&aqi=no`);
      if (!response.ok) {
        throw Error("Location does not exist.");
      }
      const data = await response.json();
      setWeather(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      fetchData();
      setLocation("");
      setIsLoading(true);
    }
  };

  const searchWithBtn = () => {
    fetchData();
    setLocation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const imageChange = (condition) => {
    switch (condition) {
      case "Sunny":
        return <img src={sunny} alt="clear sky" width={150} />;
      case "Partly cloudy":
        return <img src={cloudy} alt="cloudy sky" width={150} />;
      case "Cloudy":
        return <img src={cloudy} alt="cloudy sky" width={150} />;
      case "Heavy snow":
        return <img src={snow} alt="cloudy sky" width={150} />;
      case "Overcast":
        return <img src={overcast} alt="cloudy sky" width={150} />;
      case "Rainy":
        return <img src={rainy} alt="cloudy sky" width={150} />;
      case "Moderate rain":
        return <img src={rainy} alt="cloudy sky" width={150} />;
      case "Light rain":
        return <img src={rainy} alt="cloudy sky" width={150} />;
      case "Clear":
        return <img src={sunny} alt="cloudy sky" width={150} />;
      default:
        return <img src={cloudy} alt="sunny sky" width={150} />;
    }
  };

  const today = dateFormat(new Date(), "dddd, dS mmmm");
  masks.hour = "HH:MM tt";

  return (
    <div className="container">
      <h5 className="app-title">Weather Forecast</h5>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Enter location"
          autoFocus
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
        />
        <button className="btn" type="button" onClick={searchWithBtn}>
          Show
        </button>
      </form>
      {loading && (
        <div className="loading">
          <div className="sweet-loading">
            <FadeLoader
              loading={loading}
              cssOverride={override}
              size={50}
              color="#fff"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}

      {weather.location ? (
        <>
          <div className="info-container">
            <div className="current-date">
              <h5 className="day">Today</h5>
              <h5 className="date-today">{today}</h5>
            </div>
            <div className="weather">
              <div className="weather-info">
                <h2 className="temp">
                  {Math.ceil(weather.current.temp_c)}
                  <span className="celsius">&#8451;</span>
                </h2>
                {imageChange(weather.current.condition.text)}
              </div>
              <h4 className="location">
                <CiLocationOn style={{ color: "yellow", marginRight: "3px" }} />
                {weather.location.name}, {weather.location.country}
              </h4>
              {/* <p className="weather-condition">
              {weather.current.condition.text}
            </p> */}
            </div>
          </div>
          <div className="aditional-info">
            <div className="aditional-info__container">
              <CiTempHigh
                style={{
                  color: "#fad059",
                  width: "30px",
                  height: "30px",
                  marginBottom: "5px",
                }}
              />
              <p>
                <span></span> {Math.ceil(weather.current.feelslike_c)}
                &deg;
              </p>
            </div>
            <div className="aditional-info__container">
              <BiWind
                style={{
                  color: "#fad059",
                  width: "30px",
                  height: "30px",
                  marginBottom: "5px",
                }}
              />
              <p>
                <span></span> {weather.current.wind_kph} kph
              </p>
            </div>
            <div className="aditional-info__container">
              <BsClouds
                style={{
                  color: "#fad059",
                  width: "30px",
                  height: "30px",
                  marginBottom: "5px",
                }}
              />
              <p>
                <span></span> {weather.current.cloud}%
              </p>
            </div>
          </div>
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}

export default App;

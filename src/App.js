import { useReducer } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiTempHigh } from "react-icons/ci";
import { BiWind } from "react-icons/bi";
import { BsClouds } from "react-icons/bs";
import FadeLoader from "react-spinners/FadeLoader";
import dateFormat, { masks } from "dateformat";
import ImageChange from "./components/ImageChange";
import reducer from "./reducer";

// styling spinner
const override = {
  display: "block",
  margin: "0 auto",
  color: "#fff",
};

const initialState = {
  weather: {},
  location: "",
  error: null,
  loading: false,
};

// api path
const api = `https://api.weatherapi.com/v1/current.json?key=20aaa760a34c49648a5104827230603`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      dispatch({ type: "LOADING" });
      const response = await fetch(`${api}&q=${state.location}&aqi=no`);
      if (!response.ok) {
        throw Error("Location does not exist.");
      }
      const data = await response.json();
      dispatch({ type: "GET_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: state.error });
    }
  };

  const searchWithEnter = (e) => {
    if (e.key === "Enter") {
      fetchData();
      dispatch({ type: "SET_LOCATION", payload: "" });
    }
  };

  const searchWithBtn = () => {
    fetchData();
    dispatch({ type: "SET_LOCATION", payload: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          value={state.location}
          onChange={(e) =>
            dispatch({ type: "SET_LOCATION", payload: e.target.value })
          }
          onKeyDown={searchWithEnter}
        />
        <button className="btn" type="button" onClick={searchWithBtn}>
          Show
        </button>
      </form>
      {state.loading && (
        <div className="loading">
          <div className="sweet-loading">
            <FadeLoader
              loading={state.loading}
              cssOverride={override}
              size={50}
              color="#fff"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}

      {state.weather.location ? (
        <>
          <div className="info-container">
            <div className="current-date">
              <h5 className="day">Today</h5>
              <h5 className="date-today">{today}</h5>
            </div>
            <div className="weather">
              <div className="weather-info">
                <h2 className="temp">
                  {Math.round(state.weather.current.temp_c)}
                  <span className="celsius">&#8451;</span>
                </h2>
                <ImageChange condition={state.weather.current.condition.text} />
              </div>
              <div className="location-condition">
                <h4 className="location">
                  <CiLocationOn
                    style={{ color: "yellow", marginRight: "3px" }}
                  />
                  {state.weather.location.name},{" "}
                  {state.weather.location.country}
                </h4>
              </div>
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
                <span></span> {Math.round(state.weather.current.feelslike_c)}
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
                <span></span> {Math.round(state.weather.current.wind_kph)} kph
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
                <span></span> {state.weather.current.cloud}%
              </p>
            </div>
          </div>
        </>
      ) : (
        <div>{state.error}</div>
      )}
    </div>
  );
}

export default App;

import WeatherImage from "./WeatherImage";
import sunny from "../assets/sunny.png";
import cloudy from "../assets/cloudy.png";
import rainy from "../assets/rainy.png";
import snow from "../assets/snow.png";
import overcast from "../assets/overcast.png";

const ImageChange = ({ condition }) => {
  switch (condition) {
    case "Sunny":
      return <WeatherImage condition={sunny} />;
    case "Partly cloudy":
      return <WeatherImage condition={cloudy} />;
    case "Cloudy":
      return <WeatherImage condition={cloudy} />;
    case "Heavy snow":
      return <WeatherImage condition={snow} />;
    case "Overcast":
      return <WeatherImage condition={overcast} />;
    case "Rainy":
      return <WeatherImage condition={rainy} />;
    case "Moderate rain":
      return <WeatherImage condition={rainy} />;
    case "Light rain":
      return <WeatherImage condition={rainy} />;
    case "Clear":
      return <WeatherImage condition={sunny} />;
    default:
      // return <WeatherImage condition={cloudy} />;
      <p>missing image</p>;
  }
};

export default ImageChange;

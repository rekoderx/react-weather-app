const WeatherImage = ({ condition }) => {
  return <img src={condition} alt={condition} width={150} />;
};

export default WeatherImage;

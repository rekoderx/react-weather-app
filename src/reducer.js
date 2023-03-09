const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "GET_DATA":
      return {
        ...state,
        weather: action.payload,
        loading: false,
        error: null,
      };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_ERROR":
      return {
        ...state,
        error: "Location does not exist.",
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

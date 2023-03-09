const SearchForm = ({
  handleSubmit,
  location,
  searchWithEnter,
  searchWithBtn,
  handleOnChangeInput,
}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Enter location"
        autoFocus
        value={location}
        onChange={(e) => {
          handleOnChangeInput(e.target.value);
        }}
        onKeyDown={(e) => {
          searchWithEnter(e.key);
        }}
      />
      <button
        className="btn"
        type="button"
        onClick={() => {
          searchWithBtn();
        }}
      >
        Show
      </button>
    </form>
  );
};

export default SearchForm;

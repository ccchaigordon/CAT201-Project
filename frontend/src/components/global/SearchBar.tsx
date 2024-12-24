function SearchBar() {
  return (
    <>
      <form className="search-container">
        <input type="text" id="search-bar" placeholder="Search item or brand" />
        <a href="#">
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          />
        </a>
      </form>
    </>
  );
}

export default SearchBar;

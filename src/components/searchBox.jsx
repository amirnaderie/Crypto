import React,{useContext} from "react";
import {MoviesContext} from "./context/Context"
const SearchBox = () => {
  const {searchQuery,handleSearch } = useContext(MoviesContext);
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={searchQuery}
      onChange={e => handleSearch(e.currentTarget.value)}
    />
  );
};

export default SearchBox;

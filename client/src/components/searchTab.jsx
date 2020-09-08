import React, { useContext } from "react";
import useDebouncedSearch from "./useDebouncedSearch.hook";

import PopUpContext from "../utils/context";
import API from "../utils/api";

import { RiSearchLine } from "react-icons/ri";
import "./styles/searchTab.scss";
import Loader from "./loader";

const SearchTab = () => {
  const api = new API();
  const { context, changeContext } = useContext(PopUpContext);

  const useGetSearchResults = () =>
    useDebouncedSearch((text) => api.getResultsWithText(text));

  const { inputText, setInputText, searchResults } = useGetSearchResults();

  const _handleItemClick = (item) => {
    changeContext({
      ...context,
      active: 3,
      data: {
        cord: item.geometry.coordinates,
        suggest: [item],
      },
    });
  };

  const _handleItemHover = (item) => {
    changeContext({
      ...context,
      tempLocation: item.geometry.coordinates,
    });
  };

  const _handleItemLeave = () => {
    changeContext({
      ...context,
      tempLocation: null,
    });
  };

  return (
    <div className="search">
      <div className="search--input">
        <RiSearchLine />
        <input
          type="text"
          placeholder="Search..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="search--results">
        <ul className="resultsList">
          {searchResults.result ? (
            searchResults.result.map((cur) => {
              return (
                <li
                  className="resultsList--item"
                  key={cur.place_name}
                  onClick={() => _handleItemClick(cur)}
                  onMouseEnter={() => _handleItemHover(cur)}
                  onMouseLeave={() => _handleItemLeave()}
                >
                  {cur.place_name}
                </li>
              );
            })
          ) : searchResults.loading ? (
            <Loader />
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default SearchTab;

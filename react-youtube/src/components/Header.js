import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import hamburger from "../assets/hamburger.png";
import youtubeLogo from "../assets/youtube.svg";
import userIcon from "../assets/userIcon.png";
import { toogleMenu } from "../utils/appSlice";
import { SEARCH_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { cacheSuggestions } from "../utils/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.cache);
  // const navigate = useHistory();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[search]) {
        setSuggestions(searchCache[search]);
      } else {
        getSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  const toogleMenuHandler = () => {
    dispatch(toogleMenu());
  };
  const getSuggestions = async () => {
    await fetch(SEARCH_API + search)
      .then((data) => data.json())
      .then((response) => {
        setSuggestions(response[1]);
        dispatch(
          cacheSuggestions({
            [search]: response[1],
          })
        );
      });
  };
  const handleSuggestion = (event) => {
    setSearch(event.target.innerText);
    setShowSuggestions(false);
    // navigate("/results?search_query=" + encodeURI(event.target.innerText));
  };
  return (
    <div className="grid grid-flow-col p-3 fixed w-full bg-white">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          src={hamburger}
          onClick={() => toogleMenuHandler()}
        />
        <a href="/">
          <img className="h-8 mx-2" alt="youtube-logo" src={youtubeLogo} />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div className="relative">
          <div className="flex flex-row relative">
            <input
              className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
              🔍
            </button>
          </div>
          {search && showSuggestions && suggestions?.length > 0 && (
            <div className="absolute bg-white w-[650px] max-h-[400px] shadow-lg border rounded-lg overflow-y-auto left-1 top-10 text-left">
              <ul className="py-3">
                {suggestions?.map((suggestion) => (
                  <li
                    key={suggestion}
                    onMouseDown={(e) => handleSuggestion(e)}
                    className="my-1 p-1 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      className="mr-5 h-4 ml-3 inline-block"
                      alt="search-icon"
                      src="https://cdn-icons-png.flaticon.com/512/482/482631.png"
                    />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <img className="h-8" alt="user" src={userIcon} />
      </div>
    </div>
  );
};

export default Header;

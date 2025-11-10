import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Fuse from "fuse.js";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getTagsFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTagClick = (tagName) => {
    navigate(`/search/tag-${tagName}`);
  };

  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(allTags, {
      keys: ["name", "tags"],
      threshold: 0.3, // lower = stricter match
    });
    console.log(allTags);

    const result = fuse.search(searchText, { limit: 5 });
    setSearchResults(result);
    console.log(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const getTagsFromServer = () => {
    axios
      .get(`${appUrl}/tag`)
      .then((response) => {
        setAllTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="topbar__left__searchWrapper w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-0 relative">
      <div className="flex flex-wrap sm:flex-nowrap items-center bg-gray-200 px-3 py-2 text-gray-500 rounded-lg gap-3 sm:gap-4">
        <FaSearch className="text-base sm:text-lg" />
        <input
          name="searchInput"
          id="searchInput"
          type="text"
          className="flex-1 min-w-0 outline-none bg-transparent text-sm sm:text-base"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {searchResults?.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-full z-30">
          {searchResults.map((item) => (
            <div
              key={item.item._id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleTagClick(item.item.name)}
            >
              {item.item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

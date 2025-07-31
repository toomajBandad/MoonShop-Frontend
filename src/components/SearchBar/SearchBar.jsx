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
    navigate(`/search/tag-${tagName}`)
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
    <div className="topbar__left__searchWrapper flex items-center justify-center relative">
      <div className="flex items-center justify-center bg-gray-200 px-4 py-2 text-gray-500 rounded-lg gap-4">
        <FaSearch />
        <input
          name="searchInput"
          id="searchInput"
          type="text"
          className="topbar__left__searchInput outline-0 w-lg"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="top-12 left-0 absolute bg-gray-50 w-full p-0 z-30">
        {searchResults?.map((item) => (
          <div
            key={item.item._id}
            className="p-1 cursor-pointer hover:bg-gray-400 hover:text-white"
            onClick={() => handleTagClick(item.item.name)}
          >
            {item.item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

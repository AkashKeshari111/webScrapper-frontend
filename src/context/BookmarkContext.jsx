import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);


  const fetchBookmarks = async () => {
    try {
      const { data } = await API.get("/user/bookmarks");
      setBookmarkedStories(data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBookmark = async (id) => {
    try {
      const { data } = await API.post(`/stories/${id}/bookmark`);

      setBookmarkedStories(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedStories, toggleBookmark,fetchBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

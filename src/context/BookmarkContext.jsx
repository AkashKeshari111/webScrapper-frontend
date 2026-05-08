import { createContext, useEffect, useState } from "react";
import API from "../services/api";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchBookmarks = async () => {
    try {
      const { data } = await API.get("/user/bookmarks");
      setBookmarkedStories(data?.data || []);
      console.log(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarkedStories([]);
    }
  }, [user]);

  const toggleBookmark = async (id) => {
    try {
      const { data } = await API.post(`/stories/${id}/bookmark`);
      const updatedIds = data?.data?.bookmarks?.map((b) => b._id || b);

      setBookmarkedStories(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedStories, toggleBookmark, fetchBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

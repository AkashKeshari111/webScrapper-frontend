import { useContext, useEffect } from "react";

import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import BookmarksList from "../components/bookmarks/BookmarksList";

import { BookmarkContext } from "../context/BookmarkContext";

function Bookmarks() {
  const { bookmarkedStories } = useContext(BookmarkContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container>
        <section className="py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold">Your Bookmarks</h1>

              <p className="text-gray-500 mt-2">
                Saved stories for later reading.
              </p>
            </div>

            <div className="bg-white border rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-3xl font-bold">
                {bookmarkedStories?.length || 0}
              </p>

              <p className="text-sm text-gray-500 mt-1">Saved Stories</p>
            </div>
          </div>

          <BookmarksList bookmarks={bookmarkedStories} />
        </section>
      </Container>
    </div>
  );
}

export default Bookmarks;

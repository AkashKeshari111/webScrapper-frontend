import { ArrowUpRight, BookmarkX, Clock3 } from "lucide-react";
import { useContext, useEffect } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";

function BookmarksList({ bookmarks = [] }) {
  const { toggleBookmark, fetchBookmarks } = useContext(BookmarkContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (!bookmarks.length) {
    return (
      <div className="text-center py-16 text-gray-500">No bookmarks yet</div>
    );
  }

  return (
    <div className="space-y-6">
      {bookmarks.map((story) => (
        <article
          key={story._id}
          className="
            group
            bg-white
            rounded-3xl
            p-6 md:p-8
            shadow-sm
            hover:shadow-md
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Bookmarked
                </span>

                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock3 size={14} />
                  Recently saved
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-black leading-snug">
                {story.title}
              </h2>

              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2">
                {story.description || "No description available"}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                  {story.points} points
                </span>

                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                  by {story.author}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className="
                  h-11
                  px-5
                  rounded-2xl
                  bg-black
                  text-white
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  hover:opacity-90
                  transition
                "
              >
                Read
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={() => toggleBookmark(story._id)}
                className="
                  h-11
                  w-11
                  rounded-2xl
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  hover:bg-red-50
                  hover:border-red-200
                  transition
                  cursor-pointer
                "
              >
                <BookmarkX size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BookmarksList;

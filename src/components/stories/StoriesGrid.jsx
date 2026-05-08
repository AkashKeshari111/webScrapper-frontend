import StoryCard from "./StoryCard";
import Pagination from "../ui/Pagination";
import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";

function StoriesGrid({
  stories = [],
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
}) {
  const { bookmarkedStories } = useContext(BookmarkContext);

  if (!stories.length) {
    return (
      <div className="text-center py-20 text-gray-500">No stories found</div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => {
          const isBookmarked = bookmarkedStories.includes(story._id);

          return (
            <div
              key={story._id}
              className={`
                transition-all duration-300
                hover:-translate-y-1
                ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              `}
            >
              <StoryCard story={story} isBookmarked={isBookmarked} />
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div>
        <div>
          <Pagination
            page={page}
            limit={limit}
            setLimit={setLimit}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export default StoriesGrid;

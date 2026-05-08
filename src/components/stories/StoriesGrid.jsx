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

  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <div className="space-y-12 bg-gray-50 p-4 sm:p-6 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white">
            <StoryCard
              story={featured}
              isBookmarked={bookmarkedStories.some(
                (s) => s._id === featured._id,
              )}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((story) => {
          const isBookmarked = bookmarkedStories.some(
            (s) => s._id === story._id,
          );

          return (
            <div
              key={story._id}
              className="
                bg-white
                rounded-2xl
                shadow-sm
                hover:shadow-md
                hover:-translate-y-1
                transition
              "
            >
              <StoryCard story={story} isBookmarked={isBookmarked} />
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <Pagination
          page={page}
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default StoriesGrid;

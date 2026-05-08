import { ExternalLink, Star } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookmarkContext } from "../../context/BookmarkContext";
import { AuthContext } from "../../context/AuthContext";

function StoryCard({ story, isBookmarked }) {
  const { user } = useContext(AuthContext);
  const { toggleBookmark } = useContext(BookmarkContext);
  const navigate = useNavigate();

  const handleBookmark = async (id) => {
    if (!user) {
      navigate("/login", {
        state: { from: "/" },
      });
      return;
    }

    await toggleBookmark(id);
  };



  return (
    <article
      className="
        h-full
        min-h-[200px]
        flex
        flex-col
        justify-between
        bg-white
        border
        border-gray-200
        rounded-3xl
        p-6
        hover:shadow-lg
        transition
      "
    >

      {/* TOP */}
      <div className="flex justify-between gap-4">

        {/* TEXT BLOCK */}
        <div className="min-w-0 flex-1">

          <h2 className="font-bold text-lg text-black leading-snug break-words">
            {story.title}
          </h2>

          <p className="text-sm text-gray-500 mt-2 truncate">
            by {story.author} • {story.points} points
          </p>

        </div>



        {/* BOOKMARK BUTTON (FIXED SIZE) */}
        <button
          onClick={() => handleBookmark(story._id)}
          className={`
            flex-shrink-0
            h-11
            w-11
            rounded-full
            flex
            items-center
            justify-center
            border
            transition
            shadow-sm

            ${isBookmarked
              ? "bg-black text-white"
              : "hover:bg-gray-100"
            }
          `}
        >
          <Star size={18} />
        </button>

      </div>



      {/* BOTTOM */}
      <div className="flex justify-between mt-6">

        <span className="text-sm text-gray-500">
          {story.postedAt || "recent"}
        </span>

        <Link
          to={`/stories/${story._id}`}
          className="flex items-center gap-2 text-sm font-medium text-black"
        >
          Read More
          <ExternalLink size={16} />
        </Link>

      </div>

    </article>
  );
}

export default StoryCard;
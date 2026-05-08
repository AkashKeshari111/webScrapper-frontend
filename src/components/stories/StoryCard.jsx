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
      navigate("/login", { state: { from: "/" } });
      return;
    }
    await toggleBookmark(id);
  };

  return (
    <article
      className="
      h-full min-h-[200px]
      flex flex-col justify-between
      bg-white
      rounded-3xl
      p-6
      border border-gray-100
      hover:border-slate-200
      hover:shadow-sm
      transition
      group
    "
    >
      <div className="flex justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2
            className="
            font-semibold
            text-lg
            text-slate-800
            leading-snug
            break-words
            group-hover:text-slate-900
            transition
          "
          >
            {story.title}
          </h2>

          <p className="text-sm text-slate-500 mt-2 truncate">
            by <span className="text-slate-600">{story.author}</span>
            <span className="mx-1 text-slate-400">•</span>
            <span className="text-amber-600 font-medium">
              {story.points} pts
            </span>
          </p>
        </div>

        <button
          onClick={() => handleBookmark(story._id)}
          className={`
            flex-shrink-0
            h-11 w-11
            rounded-full
            flex items-center justify-center
            border border-slate-200
            transition
            cursor-pointer

            ${
              isBookmarked
                ? "bg-slate-800 text-white border-slate-800"
                : "hover:bg-slate-100 text-slate-500"
            }
          `}
        >
          <Star size={18} />
        </button>
      </div>


      <div className="flex justify-between mt-6 items-center">
        <span className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
          {story.postedAt || "recent"}
        </span>

        <Link
          to={`/stories/${story._id}`}
          className="
            flex items-center gap-2
            text-sm font-medium
            text-slate-500
            hover:text-slate-800
            transition
          "
        >
          Read More
          <ExternalLink size={16} />
        </Link>
      </div>
    </article>
  );
}

export default StoryCard;

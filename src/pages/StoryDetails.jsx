import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  Clock3,
  Star,
} from "lucide-react";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";
import { BookmarkContext } from "../context/BookmarkContext";

import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";

function StoryDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const {
    bookmarkedStories,
    toggleBookmark,
  } = useContext(BookmarkContext);

  const [story, setStory] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const { data } = await API.get(`/stories/${id}`);

        setStory(data?.data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const isBookmarked = bookmarkedStories.some(
    (s) => s._id === id
  );

  const handleBookmark = async () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/stories/${id}`,
        },
      });

      return;
    }

    toggleBookmark(id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="p-10 text-center text-gray-500">
          Loading story...
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="p-10 text-center text-gray-500">
          Story not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container>
        <section className="py-8 md:py-12">
          {/* BACK BUTTON */}
          <Link
            to="/"
            className="
              inline-flex
              items-center
              text-sm
              text-gray-500
              hover:text-black
              transition
            "
          >
            ← Back to stories
          </Link>

          {/* CARD */}
          <div
            className="
              mt-6
              bg-white
              border
              rounded-[2rem]
              p-5
              sm:p-7
              md:p-10
              lg:p-12
              shadow-sm
            "
          >
            {/* TOP BADGES */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-orange-100
                  text-orange-700
                  text-xs
                  sm:text-sm
                  font-semibold
                "
              >
                Trending Story
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  text-xs
                  sm:text-sm
                "
              >
                <Clock3 size={16} />

                <span>
                  {story.postedAt || "Recently"}
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                font-bold
                leading-tight
                tracking-tight
                break-words
              "
            >
              {story.title}
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6
                md:mt-8
                text-base
                md:text-lg
                text-gray-600
                leading-relaxed
                max-w-4xl
              "
            >
              {story.description ||
                "No description available"}
            </p>

            {/* META */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                md:gap-4
                mt-8
                md:mt-10
              "
            >
              <div
                className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-gray-100
                  text-sm
                  font-medium
                "
              >
                ⭐ {story.points} points
              </div>

              <div
                className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-gray-100
                  text-sm
                  font-medium
                  break-all
                "
              >
                👨‍💻 by {story.author}
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className="
                mt-10
                md:mt-12
                flex
                flex-col
                sm:flex-row
                items-stretch
                sm:items-center
                gap-4
              "
            >
              {/* READ BUTTON */}
              <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className="
                  h-14
                  px-6
                  rounded-2xl
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-3
                  font-medium
                  hover:opacity-90
                  transition
                  text-sm
                  md:text-base
                "
              >
                Read Original Article

                <ArrowUpRight size={20} />
              </a>

              {/* BOOKMARK BUTTON */}
              <button
                onClick={handleBookmark}
                className={`
                  h-14
                  px-6
                  rounded-2xl
                  border
                  flex
                  items-center
                  justify-center
                  gap-3
                  font-medium
                  transition
                  cursor-pointer
                  text-sm
                  md:text-base

                  ${
                    isBookmarked
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                <Star
                  size={20}
                  fill={
                    isBookmarked
                      ? "currentColor"
                      : "none"
                  }
                />

                {isBookmarked
                  ? "Bookmarked"
                  : "Bookmark Story"}
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default StoryDetails;
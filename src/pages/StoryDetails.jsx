import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock3, Star } from "lucide-react";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";
import { BookmarkContext } from "../context/BookmarkContext";

import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";

function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { bookmarkedStories, toggleBookmark } = useContext(BookmarkContext);

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

  const isBookmarked = bookmarkedStories.some((s) => s._id === id);

  const handleBookmark = async () => {
    if (!user) {
      navigate("/login", {
        state: { from: `/stories/${id}` },
      });
      return;
    }

    toggleBookmark(id);
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading story...</div>
    );
  }

  if (!story) {
    return (
      <div className="p-10 text-center text-gray-500">Story not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container>
        <section className="py-12">
          <Link to="/" className="text-sm text-gray-500 hover:text-black">
            ← Back to stories
          </Link>

          <div className="mt-6 bg-white border rounded-[2rem] p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                Trending Story
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock3 size={16} />
                {story.postedAt || "Recently"}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              {story.title}
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-4xl">
              {story.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <div className="px-5 py-3 rounded-2xl bg-gray-100 text-sm font-medium">
                ⭐ {story.points} points
              </div>

              <div className="px-5 py-3 rounded-2xl bg-gray-100 text-sm font-medium">
                👨‍💻 by {story.author}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className="h-14 px-7 rounded-2xl bg-black text-white flex items-center gap-3 font-medium hover:opacity-90 transition"
              >
                Read Original Article
                <ArrowUpRight size={20} />
              </a>

              <button
                onClick={handleBookmark}
                className={`
                  h-14 px-7 rounded-2xl border flex items-center gap-3 font-medium transition cursor-pointer

                  ${isBookmarked ? "bg-black text-white" : "hover:bg-gray-100"}
                `}
              >
                <Star size={20} fill={isBookmarked ? "currentColor" : "none"} />

                {isBookmarked ? "Bookmarked" : "Bookmark Story"}
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default StoryDetails;

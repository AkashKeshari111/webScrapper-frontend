import { useEffect, useState, useContext, useRef } from "react";
import { Flame } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import StoriesGrid from "../components/stories/StoriesGrid";

import API from "../services/api";
import { BookmarkContext } from "../context/BookmarkContext.jsx";

function Home() {
  const { bookmarkedStories } = useContext(BookmarkContext);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const storiesRef = useRef(null);

  const scrollToStories = () => {
    storiesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);

        const { data } = await API.get(`/stories?page=${page}&limit=${limit}`);

        setStories(data?.data || []);
        setTotalPages(data?.meta?.totalPages || 1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [page, limit]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <Container>
        <section className="py-14 md:py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-black via-gray-900 to-gray-800 px-8 md:px-12 py-14 md:py-20 text-white shadow-2xl">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div
                onClick={scrollToStories}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur cursor-pointer hover:bg-white/20 transition"
              >
                <Flame size={16} className="text-orange-400" />
                Top Hacker News Stories
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Discover Trending <br />
                <span className="text-orange-400">Tech Stories</span>
              </h1>

              <p className="mt-6 text-gray-300 max-w-xl text-lg">
                Stay updated with AI, startups, engineering blogs and developer
                insights.
              </p>
            </div>
          </div>
        </section>

        <section ref={storiesRef} className="pb-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Top Stories
              </h2>

              <p className="text-gray-500 mt-1">
                Latest trending developer content
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white rounded-3xl shadow-sm animate-pulse"
                />
              ))}
            </div>
          ) : (
            <StoriesGrid
              stories={stories}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              limit={limit}
              setLimit={setLimit}
            />
          )}
        </section>
      </Container>
    </div>
  );
}

export default Home;

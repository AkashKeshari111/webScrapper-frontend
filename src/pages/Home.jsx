import { useEffect, useState } from "react";

import { Flame, TrendingUp } from "lucide-react";

import Navbar from "../components/layout/Navbar";

import Container from "../components/ui/Container";

import StoriesGrid from "../components/stories/StoriesGrid";

import API from "../services/api";

function Home() {
  const [stories, setStories] = useState([]);

  const [bookmarkedStories, setBookmarkedStories] = useState([]);

  const [loading, setLoading] = useState(true);

  // fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await API.get("/stories");

        setStories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // bookmark handler
  const handleBookmark = async (id) => {
    try {
      await API.post(`/stories/${id}/bookmark`);

      setBookmarkedStories((prev) => {
        if (prev.includes(id)) {
          return prev.filter((storyId) => storyId !== id);
        }

        return [...prev, id];
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container>
        <section
          className="
            py-12
            md:py-16
          "
        >
          <div
            className="
              bg-gradient-to-br
              from-black
              to-gray-800
              rounded-[2rem]
              p-8
              md:p-12
              text-white
              relative
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                top-0
                right-0
                w-72
                h-72
                bg-orange-500/20
                blur-3xl
                rounded-full
              "
            />

            <div className="relative z-10">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  border
                  border-white/20
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  mb-6
                "
              >
                <Flame size={16} />
                Top 10 Hacker News Stories
              </div>

              <h1
                className="
                  text-4xl
                  md:text-6xl
                  font-bold
                  leading-tight
                  max-w-4xl
                "
              >
                Discover Trending Tech Stories & Developer News
              </h1>

              <p
                className="
                  mt-6
                  text-gray-300
                  text-lg
                  max-w-2xl
                  leading-relaxed
                "
              >
                Stay updated with the most discussed startup ideas, AI
                innovations, engineering blogs, and developer trends curated
                from Hacker News.
              </p>

              <div
                className="
                  mt-10
                  flex
                  flex-wrap
                  gap-4
                "
              >
                <div
                  className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    min-w-[180px]
                  "
                >
                  <p className="text-3xl font-bold">10</p>

                  <p className="text-sm text-gray-300 mt-1">Stories Updated</p>
                </div>

                <div
                  className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    min-w-[180px]
                  "
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} />

                    <p className="text-3xl font-bold">Live</p>
                  </div>

                  <p className="text-sm text-gray-300 mt-1">Scraped from HN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                Top Stories
              </h2>

              <p
                className="
                  text-gray-500
                  mt-2
                "
              >
                Latest trending stories from the tech world.
              </p>
            </div>
          </div>

          {loading ? (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="
                      h-60
                      rounded-2xl
                      bg-white
                      animate-pulse
                    "
                />
              ))}
            </div>
          ) : (
            <StoriesGrid
              stories={stories}
              onBookmark={handleBookmark}
              bookmarkedStories={bookmarkedStories}
            />
          )}
        </section>
      </Container>
    </div>
  );
}

export default Home;

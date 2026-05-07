import { ArrowUpRight, BookmarkCheck, BookmarkX, Clock3 } from "lucide-react";

function BookmarksList() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <article
          key={index}
          className="
              group
              bg-white
              border
              border-gray-200
              rounded-[28px]
              p-7
              hover:border-gray-300
              hover:shadow-xl
              transition-all
              duration-300
            "
        >
          <div
            className="
                flex
                flex-col
                xl:flex-row
                xl:items-start
                xl:justify-between
                gap-8
              "
          >
            {/* left content */}
            <div className="flex-1 min-w-0">
              {/* top meta */}
              <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    mb-5
                  "
              >
                <div
                  className="
                      inline-flex
                      items-center
                      gap-2
                      bg-emerald-50
                      text-emerald-700
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-semibold
                      border
                      border-emerald-100
                    "
                >
                  <BookmarkCheck size={14} />
                  Bookmarked
                </div>

                <div
                  className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-gray-500
                    "
                >
                  <Clock3 size={15} />
                  Saved 2 hours ago
                </div>
              </div>

              {/* title */}
              <h2
                className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-gray-900
                    group-hover:text-black
                    transition
                  "
              >
                Building scalable AI tools for developers and startups
              </h2>

              {/* description */}
              <p
                className="
                    mt-4
                    text-gray-600
                    leading-relaxed
                    max-w-3xl
                  "
              >
                Learn how modern developer tools are transforming the startup
                ecosystem with AI, automation, and scalable engineering systems.
              </p>

              {/* footer meta */}
              <div
                className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
              >
                <div
                  className="
                      px-4
                      py-2
                      rounded-full
                      bg-gray-100
                      text-sm
                      font-medium
                      text-gray-700
                    "
                >
                  120 points
                </div>

                <div
                  className="
                      px-4
                      py-2
                      rounded-full
                      bg-gray-100
                      text-sm
                      font-medium
                      text-gray-700
                    "
                >
                  by Akash
                </div>

                <div
                  className="
                      px-4
                      py-2
                      rounded-full
                      bg-gray-100
                      text-sm
                      font-medium
                      text-gray-700
                    "
                >
                  AI
                </div>
              </div>
            </div>

            {/* actions */}
            <div
              className="
                  flex
                  items-center
                  gap-3
                  shrink-0
                "
            >
              {/* read */}
              <button
                className="
                    h-12
                    px-6
                    rounded-2xl
                    bg-black
                    text-white
                    flex
                    items-center
                    gap-2
                    font-medium
                    hover:opacity-90
                    transition
                  "
              >
                Read Story
                <ArrowUpRight size={18} />
              </button>

              {/* remove */}
              <button
                className="
                    h-12
                    w-12
                    rounded-2xl
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    hover:bg-red-50
                    hover:border-red-200
                    transition
                  "
              >
                <BookmarkX size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BookmarksList;

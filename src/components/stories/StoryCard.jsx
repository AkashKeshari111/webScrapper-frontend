import { ExternalLink, Star } from "lucide-react";

function StoryCard({ featured }) {
  return (
    <article
      className={`
        bg-white
        border
        rounded-3xl
        p-6
        hover:shadow-xl
        transition
        h-full
        flex
        flex-col
        justify-between

        ${featured ? "bg-black text-white border-black" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`
              text-xs
              font-medium
              px-3
              py-1
              rounded-full

              ${featured ? "bg-white/10 text-gray-200" : "bg-gray-100"}
            `}
          >
            Trending
          </span>

          <h2
            className={`
              font-bold
              leading-snug
              mt-4

              ${featured ? "text-3xl" : "text-lg"}
            `}
          >
            Building AI tools for developers
          </h2>

          <p
            className={`
              mt-3
              text-sm

              ${featured ? "text-gray-300" : "text-gray-500"}
            `}
          >
            by Akash • 120 points
          </p>
        </div>

        <button
          className={`
            h-10
            w-10
            rounded-full
            flex
            items-center
            justify-center
            transition
            shrink-0

            ${
              featured
                ? "bg-white/10 hover:bg-white/20"
                : "border hover:bg-gray-100"
            }
          `}
        >
          <Star size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-8">
        <span
          className={`
            text-sm

            ${featured ? "text-gray-300" : "text-gray-500"}
          `}
        >
          2 hours ago
        </span>

        <a
          href="/"
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
          "
        >
          Read More
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}

export default StoryCard;

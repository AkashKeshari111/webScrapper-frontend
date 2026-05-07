import Pagination from "../ui/Pagination";

import StoryCard from "./StoryCard";

function StoriesGrid() {
  const layouts = [
    "md:col-span-4 md:row-span-2",

    "md:col-span-2 md:row-span-2",

    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",

    "md:col-span-3",
    "md:col-span-3",

    "md:col-span-2 md:row-span-2",

    "md:col-span-2 md:row-span-2",
    "md:col-span-2 md:row-span-2",
  ];

  return (
    <div>
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-6
          auto-rows-[180px]
          gap-6
        "
      >
        {layouts.map((layout, index) => (
          <div key={index} className={layout}>
            <StoryCard featured={index === 0} compact={index > 1} />
          </div>
        ))}
      </div>

      {/* pagination */}
      <Pagination />
    </div>
  );
}

export default StoriesGrid;

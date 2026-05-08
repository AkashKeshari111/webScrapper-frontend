import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination({
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
}) {

  const getPages = () => {

    const pages = [];

    const delta = 1;

    const start = Math.max(
      2,
      page - delta
    );

    const end = Math.min(
      totalPages - 1,
      page + delta
    );

    pages.push(1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className="
        mt-14
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-6
      "
    >
      {/* LEFT SIDE */}
      <div
        className="
          flex
          flex-col
          sm:flex-row
          items-center
          gap-4
          w-full
          lg:w-auto
        "
      >
        <p
          className="
            text-sm
            text-gray-500
            text-center
            sm:text-left
          "
        >
          Page{" "}
          <span className="font-semibold text-black">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-black">
            {totalPages}
          </span>
        </p>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(
              Number(e.target.value)
            );

            setPage(1);
          }}
          className="
            h-10
            px-3
            rounded-xl
            border
            bg-white
            text-sm
            focus:outline-none
            cursor-pointer
          "
        >
          <option value={5}>
            5 / page
          </option>

          <option value={10}>
            10 / page
          </option>

          <option value={20}>
            20 / page
          </option>

          <option value={50}>
            50 / page
          </option>
        </select>
      </div>

      {/* PAGINATION */}
      <div
        className="
          w-full
          lg:w-auto
          overflow-x-auto
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            min-w-max
            mx-auto
            pb-1
          "
        >
          {/* PREV */}
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="
              h-11
              px-4
              rounded-2xl
              border
              bg-white
              hover:bg-gray-100
              disabled:opacity-50
              flex
              items-center
              gap-2
              transition
              cursor-pointer
            "
          >
            <ChevronLeft size={18} />
          </button>

          {/* PAGE BUTTONS */}
          {getPages().map((p, i) => (
            <button
              key={i}
              disabled={p === "..."}
              onClick={() =>
                typeof p === "number" &&
                setPage(p)
              }
              className={`
                h-11
                min-w-[44px]
                px-3
                rounded-2xl
                text-sm
                font-medium
                transition

                ${
                  p === "..."
                    ? "cursor-default text-gray-400"
                    : page === p
                    ? "bg-black text-white"
                    : `
                      bg-white
                      border
                      hover:bg-gray-100
                      cursor-pointer
                    `
                }
              `}
            >
              {p}
            </button>
          ))}

          {/* NEXT */}
          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="
              h-11
              px-4
              rounded-2xl
              bg-black
              text-white
              hover:opacity-90
              disabled:opacity-50
              flex
              items-center
              gap-2
              transition
              cursor-pointer
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
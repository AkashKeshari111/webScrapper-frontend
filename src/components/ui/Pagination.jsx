function Pagination() {
  return (
    <div
      className="
        mt-14
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-5
      "
    >
      <div>
        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Showing
          <span className="font-semibold text-black"> 1–10 </span>
          from
          <span className="font-semibold text-black">100</span>
          stories
        </p>
      </div>

      <div
        className="
          flex
          items-center
          gap-2
          flex-wrap
        "
      >
        <button
          className="
            h-11
            px-5
            rounded-2xl
            border
            bg-white
            hover:bg-gray-100
            transition
            text-sm
            font-medium
          "
        >
          Previous
        </button>

        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`
              h-11
              w-11
              rounded-2xl
              text-sm
              font-medium
              transition

              ${
                page === 1
                  ? "bg-black text-white"
                  : "bg-white border hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        ))}

        <span
          className="
            px-2
            text-gray-400
          "
        >
          ...
        </span>

        <button
          className="
            h-11
            w-11
            rounded-2xl
            border
            bg-white
            hover:bg-gray-100
            transition
            text-sm
            font-medium
          "
        >
          10
        </button>

        <button
          className="
            h-11
            px-5
            rounded-2xl
            bg-black
            text-white
            hover:opacity-90
            transition
            text-sm
            font-medium
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;

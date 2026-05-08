import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

function AuthLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-lg
          border
          p-8
        "
      >
        <div className="mb-8">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(-1)}
              className="
                h-10
                w-10
                rounded-full
                border
                flex
                items-center
                justify-center
                hover:bg-gray-100
                transition
                shrink-0
                cursor-pointer
              "
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1
                className="
                  text-3xl
                  font-bold
                "
              >
                {title}
              </h1>

              <p
                className="
                  text-gray-500
                  mt-1
                "
              >
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;

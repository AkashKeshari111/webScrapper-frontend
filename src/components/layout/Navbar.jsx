import { useContext } from "react";

import { Link } from "react-router-dom";

import { Bookmark, LogIn, LogOut } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header
      className="
        border-b
        bg-white/80
        backdrop-blur-md
        sticky
        top-0
        z-50
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="
            h-16
            flex
            items-center
            justify-between
          "
        >
          <Link
            to="/"
            className="
              text-2xl
              font-bold
              tracking-tight
            "
          >
            ScrapeNews
          </Link>

          {/* nav */}
          <nav
            className="
              flex
              items-center
              gap-3
            "
          >
            <Link
              to="/bookmarks"
              className="
                h-10
                px-4
                rounded-xl
                border
                flex
                items-center
                gap-2
                hover:bg-gray-100
                transition
              "
            >
              <Bookmark size={18} />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                Bookmarks
              </span>
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="
                  h-10
                  px-4
                  rounded-xl
                  bg-red-500
                  text-white
                  flex
                  items-center
                  gap-2
                  hover:bg-red-600
                  transition
                  cursor-pointer
                "
              >
                <LogOut size={18} />

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Logout
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="
                  h-10
                  px-4
                  rounded-xl
                  bg-black
                  text-white
                  flex
                  items-center
                  gap-2
                  hover:opacity-90
                  transition
                "
              >
                <LogIn size={18} />

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Login
                </span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  Bookmark,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* LOGO */}
          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              text-xl md:text-2xl
              font-bold
              tracking-tight
            "
          >
            <img
              src="/favicon.svg"
              alt="ScrapeNews Logo"
              className="w-7 h-7"
            />

            <span>ScrapeNews</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="
              hidden
              md:flex
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

              <span className="text-sm font-medium">
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

                <span className="text-sm font-medium">
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

                <span className="text-sm font-medium">
                  Login
                </span>
              </Link>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-xl
              border
              hover:bg-gray-100
              transition
            "
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="
              md:hidden
              pb-4
              flex
              flex-col
              gap-3
            "
          >
            <Link
              to="/bookmarks"
              onClick={() => setMenuOpen(false)}
              className="
                h-11
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

              <span className="text-sm font-medium">
                Bookmarks
              </span>
            </Link>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="
                  h-11
                  px-4
                  rounded-xl
                  bg-red-500
                  text-white
                  flex
                  items-center
                  gap-2
                  hover:bg-red-600
                  transition
                "
              >
                <LogOut size={18} />

                <span className="text-sm font-medium">
                  Logout
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  h-11
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

                <span className="text-sm font-medium">
                  Login
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
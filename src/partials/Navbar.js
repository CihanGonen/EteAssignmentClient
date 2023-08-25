import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="border-b-2 bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold text-themeColor-700">
            Home
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {!user && (
              <li>
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-black hover:text-themeColor-900"
                >
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  to="/signup"
                  className="block py-2 pl-3 pr-4 text-black hover:text-themeColor-900"
                >
                  Signup
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/companies"
                className="block py-2 pl-3 pr-4 text-black hover:text-themeColor-900"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 pl-3 pr-4 text-black">
                Products
              </Link>
            </li>
            {user && (
              <div className="flex items-center gap-2">
                <span>{user.user.username}</span>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="block border-2 border-themeColor-700 rounded py-1 pl-2 pr-2 text-black text-themeColor-700"
                  >
                    Logout
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

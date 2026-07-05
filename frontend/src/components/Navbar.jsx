import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import assets from "../assets/assets.js";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setCartItems({});
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-gray-900 ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-gray-900 ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-gray-900 ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-gray-900 ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="Search"
          className="cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile dropdown */}
        <div className="group relative">
          <img
            onClick={() => {
              if (!token) {
                navigate("/login");
              }
            }}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />

          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile menu icon */}
        <img
          onClick={() => setVisible(!visible)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
        {/* Mobile Menu */}
        <div
          className={`${
            visible ? "right-0" : "-right-full"
          } fixed top-0 h-full w-2/3 bg-white shadow-lg transition-all duration-300 sm:hidden z-50`}
        >
          <div className="flex justify-end p-5">
            <img
              onClick={() => setVisible(false)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
              alt=" Menu"
            />
          </div>
          <ul className="flex flex-col gap-8 text-gray-700 px-5 text-lg">
            <NavLink to="/" onClick={() => setVisible(false)}>
              Home
            </NavLink>
            <NavLink to="/collection" onClick={() => setVisible(false)}>
              Collection
            </NavLink>
            <NavLink to="/about" onClick={() => setVisible(false)}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setVisible(false)}>
              Contact
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

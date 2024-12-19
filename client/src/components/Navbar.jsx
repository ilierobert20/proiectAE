import "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Ștergem token-ul
    dispatch(clearCart()); // Ștergem cart-ul
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="text-2xl font-bold">E-Shop</div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
        {token ? (
          <>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline bg-red-500 px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

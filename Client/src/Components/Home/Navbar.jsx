import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../Features/Auth/userApiSlice";
import { logout } from "../Features/Auth/AuthSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ logoutApiCall ] = useLogoutMutation();

  const isOpen = () => {
    setOpen(!open);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center bg-black text-white px-8 py-4 fixed top-0 left-0 right-0">
        <h1 className="uppercase tracking-wider font-semibold">
          Authentication
        </h1>

        {userInfo ? (
          <>
            <p>{userInfo.user.name}</p>
            <button onClick={logoutHandler} className="bg-red-500 px-4 py-1">
              Logout
            </button>
          </>
        ) : (
          <>
            <div onClick={isOpen} className="cursor-pointer sm:hidden">
              {open ? <MdClose size={25} /> : <MdMenu size={25} />}
            </div>
            <div className="space-x-6 hidden sm:block">
              <Link
                to="/register"
                className="bg-blue-500 px-4 py-1 rounded-sm text-sm hover:bg-blue-600 active:bg-blue-400 font-medium"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-white text-black px-4 py-1 rounded-sm text-sm hover:bg-gray-200 active:bg-gray-100 font-medium"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* mobile */}
      {open && (
        <div className="flex flex-col justify-center items-center bg-black text-white py-8 gap-y-4 uppercase sm:hidden fixed top-14 left-0 right-0">
          <Link
            to="/register"
            className="bg-blue-500 px-4 py-1 rounded-sm text-sm hover:bg-blue-600 active:bg-blue-400 font-medium"
          >
            Sign-Up
          </Link>
          <Link
            to="/login"
            className="bg-white text-black px-4 py-1 rounded-sm text-sm hover:bg-gray-200 active:bg-gray-100 font-medium"
          >
            Sign-In
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;

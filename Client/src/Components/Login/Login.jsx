import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../Features/Auth/userApiSlice";
import { setCredentials } from "../Features/Auth/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        className="flex flex-col gap-6 w-full max-w-[80%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] bg-gray-100 py-20 px-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-4xl font-bold uppercase">Login</h1>
        </div>
        <div>
          <input
            className="px-6 py-2 w-full rounded-sm outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </div>
        <div className="relative">
          <input
            className="px-6 py-2 w-full rounded-sm outline-none"
            type={`${visible ? "password" : "text"}`}
            name="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          {visible ? (
            <AiOutlineEye
              onClick={() => setVisible(false)}
              className={`absolute top-3 right-2 cursor-pointer`}
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setVisible(true)}
              className={`absolute top-3 right-2 cursor-pointer ${
                password ? "block" : "hidden"
              }`}
            />
          )}
          <h1 className="text-xs text-end p-2">
            New customer?{" "}
            <Link to="/register" className="underline text-blue-500">
              Register
            </Link>
          </h1>
        </div>

        <div>
          <input
            className="bg-black text-white w-full py-2 text-sm rounded-sm uppercase font-semibold tracking-wider cursor-pointer"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

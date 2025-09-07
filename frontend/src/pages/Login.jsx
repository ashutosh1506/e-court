import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (user === "lawyer") {
        response = await axios.post(backendURL + "/lawyer/login", {
          email,
          password,
        });
      } else {
        response = await axios.post(backendURL + "/clients/login", {
          email,
          password,
        });
      }

      if (response.data.success) {
        const { Accesstoken, client } = response.data.data;
        localStorage.setItem("token", Accesstoken);
        if (rememberMe) {
          localStorage.setItem("rememberUser", email);
        }
        toast.success("Welcome " + client.fullName);
        dispatch(setLogin());
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-primary -mt-20 mb-10">
        Login as {user}
      </h1>
      <div className="card lg:w-full max-w-md shadow-2xl bg-base-100 mx-4">
        <form className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover text-primary mt-2"
              >
                Forgot password?
              </a>
            </label>
          </div>

          {/* Remember Me */}
          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="checkbox h-4 w-4 checkbox-primary"
              />
              <span className="label-text">Remember me</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              onClick={onSubmitHandler}
            >
              Login
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="link link-primary cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

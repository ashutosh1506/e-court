import React, { useState } from "react";
//import axios from "axios";
//import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //const navigate = useNavigate();

  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/user/login", {
  //       username,
  //       password,
  //     });

  //     if (response.data.success) {
  //       localStorage.setItem("token", response.data.token);
  //       if (rememberMe) {
  //         localStorage.setItem("rememberUser", username);
  //       }
  //       toast.success("Welcome " + username);
  //       navigate("/");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong!");
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 mx-4">
        <form /*onSubmit={onSubmitHandler}*/ className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

          {/* Username */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
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
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
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

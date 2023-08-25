import { useState } from "react";
import { Input } from "antd";
import axios from "axios";

import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useAuthContext();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username,
        password,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
      }
    } catch (err) {
      setErrors({ ...err.response.data });
    }
  };

  return (
    <div className="h-full flex justify-center">
      <div className="bg-white w-4/12 py-10 px-5 mt-20 rounded">
        <form onSubmit={submitForm}>
          <h2 className="text-2xl font-semibold">SIGN UP</h2>
          <div className="pt-10">
            <div>
              <label className="font-semibold" htmlFor="username">
                Username
              </label>
              <Input
                status={errors && errors.username ? "error" : ""}
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors && errors.username && (
                <span className="text-xs text-red-500">{errors.username}</span>
              )}
            </div>
            <div className="pt-5">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <Input
                status={errors && errors.password ? "error" : ""}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors && errors.password && (
                <span className="text-xs text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
          <div>
            {errors && errors.general && (
              <span className="text-xs text-red-500">{errors.general}</span>
            )}
          </div>
          <div className="pt-5 flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="bg-themeColor-500 text-white font-semibold text-sm py-2 px-4 rounded flex hover:bg-themeColor-800 items-center"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

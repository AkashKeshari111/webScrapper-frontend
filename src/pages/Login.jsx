import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", formData);

      login(data?.data);

      navigate(from, { replace: true });

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">

      {/* 🔥 ERROR UI */}
      {error && (
        <div className="
          mb-4
          px-4 py-3
          rounded-xl
          bg-red-50
          border border-red-200
          text-red-600
          text-sm
        ">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <AuthInput
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <AuthInput
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <AuthButton text="Login" />

      </form>

      <p className="text-sm text-center text-gray-500 mt-6">
        Don't have an account?
        <Link to="/register" className="text-black font-medium ml-1">
          Register
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Login;
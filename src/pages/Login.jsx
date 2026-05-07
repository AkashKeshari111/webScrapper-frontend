import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";

import AuthInput from "../components/auth/AuthInput";

import AuthButton from "../components/auth/AuthButton";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      login(data);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">
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

      <p
        className="
          text-sm
          text-center
          text-gray-500
          mt-6
        "
      >
        Don't have an account?
        <Link
          to="/register"
          className="
            text-black
            font-medium
            ml-1
          "
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;

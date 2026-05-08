import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
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
    setError("");

    try {
      const { data } = await API.post("/auth/register", formData);

      login(data?.data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start exploring stories">

      {/* 🔥 ERROR BOX */}
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
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

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

        <AuthButton text="Register" />

      </form>

      <p className="text-sm text-center text-gray-500 mt-6">
        Already have an account?
        <Link to="/login" className="text-black font-medium ml-1">
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Register;
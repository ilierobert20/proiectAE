import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log("Login Success:", response.data);

      // Salvăm token-ul în localStorage
      localStorage.setItem("token", response.data.token);

      // Redirecționare către Homepage după login
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Logare nereusita!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Nu ai cont?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-blue-500 underline hover:text-blue-700"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;

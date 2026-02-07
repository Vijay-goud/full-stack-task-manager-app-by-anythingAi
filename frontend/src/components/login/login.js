import { useState } from "react";
import { loginUser } from "../../api";

function Login({ setToken, onUserNotFound, onShowRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await loginUser(form);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        return;
      }

      if (data?.message === "User not found") {
        onUserNotFound();
        return;
      }

      setMessage(data?.message || "Login failed");
    } catch (error) {
      if (error?.response?.status === 401) {
        setMessage("Invalid email or password");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}

      
      <p className="link-text">
        Don&apos;t have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={onShowRegister}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;

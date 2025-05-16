import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user1", password: "pass1", role: "user" },
    { username: "user2", password: "pass2", role: "user" },
    { username: "user3", password: "pass3", role: "user" },
    { username: "user4", password: "pass4", role: "user" },
    { username: "user5", password: "pass5", role: "user" },
  ];

  const handleLogin = () => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setErrorMsg("");
      if (foundUser.role === "admin") {
        alert("Welcome Admin!");
        // Replace this with real navigation if using React Router
        console.log("Redirecting to admin dashboard...");
      } else {
        alert(`Welcome ${foundUser.username}!`);
        console.log("Redirecting to user dashboard...");
      }
    } else {
      setErrorMsg("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {errorMsg && <div style={styles.error}>{errorMsg}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#f4f4f4",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default LoginPage;

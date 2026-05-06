import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } =
    useContext(AuthContext);

  return (
    <nav
      style={{
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        background: "#222",
        color: "white",
      }}
    >
      {/* Logo */}
      <h2>TableReserve</h2>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ color: "white" }}
        >
          Home
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              style={{ color: "white" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "white" }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span>
              Welcome, {user.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
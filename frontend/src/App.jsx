import { Routes, Route } from "react-router-dom";
import RestaurantDetails from "./pages/RestaurantDetails";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Restaurants from "./pages/Restaurants";
import NewBooking from "./pages/NewBooking";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        <Route
          path="/restaurant/:id/book"
          element={<NewBooking />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />
      </Routes>
    </>
  );
}

export default App;
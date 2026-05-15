import { Routes, Route } from "react-router-dom";
import RestaurantDetails from "./pages/RestaurantDetails";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Restaurants from "./pages/Restaurants";
import NewBooking from "./pages/NewBooking";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import OwnerRestaurant from "./pages/Owner/OwnerRestaurants";
import EditRestaurant from "./pages/Owner/EditRestaurant";
import OwnerBookings from "./pages/Owner/OwnerBookings";
import OwnerMenu from "./pages/Owner/OwnerMenu";
import CreateRestaurant from "./pages/Owner/CreateRestaurant";
import OwnerReviews from "./pages/Owner/OwnerReviews";
import OwnerProfile from "./pages/Owner/OwnerProfile";



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

        <Route
          path="/owner"
          element={<OwnerDashboard />}
        />

        <Route
          path="/owner/bookings"
          element={<OwnerBookings />}
        />

        <Route
          path="/owner/restaurants"
          element={<OwnerRestaurant />}
        />
        <Route
          path="/owner/edit/:id"
          element={<EditRestaurant />}
        />

        
        <Route
          path="/owner/create-restaurant"
          element={<CreateRestaurant />}
        />

        <Route
          path="/owner/menu"
          element={<OwnerMenu />}
        />

        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        />

        <Route
          path="/owner/profile"
          element={<OwnerProfile />}
        />

        <Route
          path="/owner/reviews"
          element={<OwnerReviews />}
        />

      </Routes>
    </>
  );
}

export default App;
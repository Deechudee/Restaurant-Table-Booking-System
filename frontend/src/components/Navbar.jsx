import {
  Container,
  Group,
  Button,
  Text,
} from "@mantine/core";

import { Link } from "react-router-dom";

function Navbar() {
  const token =
    localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <Container
      fluid
      py="md"
      px="xl"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      {/* LOGO */}

      <Text
        component={Link}
        to="/"
        size="xl"
        fw={700}
        c="orange"
        style={{
          textDecoration: "none",
        }}
      >
        DineFlow
      </Text>

      {/* NAV LINKS */}

      <Group>
        {/* HOME */}

        <Button
          component={Link}
          to="/"
          variant="subtle"
          color="white"
        >
          Home
        </Button>

        {!token ? (
          <>
            {/* LOGIN */}

            <Button
              component={Link}
              to="/login"
              variant="subtle"
              color="white"
              
            >
              Login
            </Button>

            {/* REGISTER */}

            <Button
              component={Link}
              to="/register"
              color="orange"
              radius="xl"
            >
              Register
            </Button>
          </>
        ) : (
          <>
            {/* MY BOOKINGS */}

            <Button
              component={Link}
              to="/my-bookings"
              variant="subtle"
              color="white"
            >
              My Bookings
            </Button>

            {/* RESTAURANTS */}

            <Button
              component={Link}
              to="/restaurants"
              variant="subtle"
              color="white"
            >
              Restaurants
            </Button>

            {/* LOGOUT */}

            <Button
              color="red"
              radius="xl"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Group>
    </Container>
  );
}

export default Navbar;
import {
  Container,
  Paper,
  Stack,
  Group,
  Button,
  Title,
  Text,
  SimpleGrid,
} from "@mantine/core";
import {useState,useEffect,} from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function OwnerDashboard() {
  const [stats, setStats] =
  useState({
    totalRestaurants: 0,
    totalBookings: 0,
    pendingBookings: 0,
    averageRating: 0,
  });

  useEffect(() => {

  const fetchStats =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/restaurants/dashboard-stats",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  fetchStats();

}, []);

  return (
    <Container size="xl" py="xl">
      <Title mb="xl">
        Owner Dashboard
      </Title>

      <Group align="flex-start">
        {/* SIDEBAR */}

        <Paper
          shadow="md"
          p="md"
          radius="md"
          w={250}
        >
          <Stack>
            <Button
              component={Link}
              to="/owner"
              
            >
              Dashboard
            </Button>

            <Button
              component={Link}
              to="/owner/bookings"
              variant="subtle"
              color="dark"
              fullWidth
            >
              Bookings
            </Button>

            <Button
              component={Link}
              to="/owner/menu"
              variant="subtle"
              color="dark"
              fullWidth
            >
              Menu
            </Button>

            <Button
              component={Link}
              to="/owner/reviews"
              variant="subtle"
              color="dark"
              fullWidth
            >
              Reviews
            </Button>

            <Button
              component={Link}
              to="/owner/restaurants"
              variant="subtle"
              color="dark"
              fullWidth
            >
              Restaurants
            </Button>
          </Stack>
        </Paper>

        {/* MAIN CONTENT */}

        <Paper
          shadow="md"
          p="xl"
          radius="md"
          style={{ flex: 1 }}
        >
          <Title order={3}>
            Owner Dashboard
          </Title>

          <Stack mt="xl" spacing="md">
            <Paper
              shadow="md"
              p="xl"
              radius="md"
              style={{ flex: 1 }}
            >

              {/* WELCOME SECTION */}

              <Paper
                shadow="sm"
                p="lg"
                radius="md"
                mb="xl"
                withBorder
              >
                <Title order={3}>
                  Welcome, {name} 👋
                </Title>

                <Text mt="sm" c="dimmed">
                  Manage your restaurants,
                  bookings, menu, and
                  reviews from one place.
                </Text>
              </Paper>

              {/* QUICK STATS */}

              <SimpleGrid
                cols={4}
                mb="xl"
              >
              
                {/* TOTAL RESTAURANTS */}

                <Paper
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                >
                  <Text
                    size="xl"
                    fw={700}
                  >
                    🍽️ {stats.totalRestaurants}
                  </Text>

                  <Text c="dimmed">
                    Restaurants
                  </Text>
                </Paper>

                {/* TOTAL BOOKINGS */}

                <Paper
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                >
                  <Text
                    size="xl"
                    fw={700}
                  >
                    📅 {stats.totalBookings}
                  </Text>

                  <Text c="dimmed">
                    Total Bookings
                  </Text>
                </Paper>

                {/* PENDING BOOKINGS */}

                <Paper
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                >
                  <Text
                    size="xl"
                    fw={700}
                  >
                    ⏳ {stats.pendingBookings}
                  </Text>

                  <Text c="dimmed">
                    Pending
                  </Text>
                </Paper>

                {/* AVERAGE RATING */}

                <Paper
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                >
                  <Text
                    size="xl"
                    fw={700}
                  >
                    ⭐ {stats.averageRating}
                  </Text>

                  <Text c="dimmed">
                    Average Rating
                  </Text>
                </Paper>

              </SimpleGrid>

              {/* QUICK ACTIONS */}

              <Title
                order={4}
                mb="md"
              >
                Quick Actions
              </Title>

              <Stack>

                <Button
                  component={Link}
                  to="/owner/create-restaurant"
                  color="orange"
                  fullWidth
                >
                  + Create Restaurant
                </Button>

                <Button
                  component={Link}
                  to="/owner/restaurants"
                  variant="light"
                  color="orange"
                  fullWidth
                >
                  Manage Restaurants
                </Button>

                <Button
                  component={Link}
                  to="/owner/bookings"
                  variant="light"
                  color="orange"
                  fullWidth
                >
                  View Bookings
                </Button>

              </Stack>

            </Paper>
          </Stack>
        </Paper>

      </Group>
    </Container>
  );
}

export default OwnerDashboard;
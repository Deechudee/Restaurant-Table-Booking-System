import {
  Container,
  Paper,
  Stack,
  Group,
  Button,
  Title,
} from "@mantine/core";

import { Link } from "react-router-dom";

function OwnerDashboard() {
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
            My Restaurants
          </Title>

          <Stack mt="xl">

            <Button
              component={Link}
              to="/owner/restaurants"
              variant="light"
              color="orange"
              size="lg"
              fullWidth
            >
              Restaurant 1
            </Button>

            <Button
              component={Link}
              to="/owner/restaurants"
              variant="light"
              color="orange"
              size="lg"
              fullWidth
            >
              Restaurant 2
            </Button>

            <Button
              component={Link}
              to="/owner/create-restaurant"
              color="orange"
              size="lg"
              fullWidth
            >
              + Create Restaurant
            </Button>

          </Stack>
        </Paper>
      </Group>
    </Container>
  );
}

export default OwnerDashboard;
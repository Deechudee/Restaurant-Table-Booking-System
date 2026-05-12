import { useEffect, useState } from "react";

import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Button,
  Group,
  Stack,
} from "@mantine/core";

import { Link } from "react-router-dom";

import API from "../../services/api";

import { notifications } from "@mantine/notifications";

function OwnerRestaurants() {

  const [restaurants, setRestaurants] =
    useState([]);

  // FETCH OWNER RESTAURANTS

  const fetchRestaurants =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/restaurants/owner/my-restaurants",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setRestaurants(
          res.data.restaurants
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    const loadRestaurants =
      async () => {
        await fetchRestaurants();
      };

    loadRestaurants();

  }, []);

  // DELETE RESTAURANT

  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/restaurants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        notifications.show({
          title: "Deleted",
          message:
            "Restaurant deleted successfully",
          color: "red",
        });

        fetchRestaurants();

      } catch (error) {

        console.log(error);

        notifications.show({
          title: "Error",
          message:
            "Delete failed",
          color: "red",
        });
      }
    };

  return (
    <Container
      size="xl"
      py="xl"
    >

      {/* PAGE TITLE */}

      <Group
        justify="space-between"
        mb="xl"
      >
        <Title>
          My Restaurants
        </Title>

        <Button
          component={Link}
          to="/owner/create-restaurant"
          color="orange"
        >
          + Create Restaurant
        </Button>
      </Group>

      {/* RESTAURANTS */}

      <SimpleGrid cols={2}>

        {restaurants.map(
          (restaurant) => (

            <Card
              key={restaurant._id}
              shadow="md"
              radius="md"
              withBorder
            >

              <Card.Section>
                <Image
                  src={
                    restaurant.image
                  }
                  height={220}
                />
              </Card.Section>

              <Stack mt="md">

                <Title order={4}>
                  🍽️{" "}
                  {
                    restaurant.restaurantName
                  }
                </Title>

                <Text c="dimmed">
                  {
                    restaurant.cuisine
                  }{" "}
                  •{" "}
                  {
                    restaurant.city
                  }
                </Text>

                <Text>
                  Seats:{" "}
                  {
                    restaurant.availableSeats
                  }
                </Text>

                <Text>
                  {
                    restaurant.openingTime
                  }{" "}
                  -{" "}
                  {
                    restaurant.closingTime
                  }
                </Text>

                {/* ACTION BUTTONS */}

                <Group mt="md">

                  <Button
                    component={Link}
                    to={`/owner/edit/${restaurant._id}`}
                    color="blue"
                    fullWidth
                  >
                    Edit
                  </Button>

                  <Button
                    color="red"
                    fullWidth
                    onClick={() =>
                      handleDelete(
                        restaurant._id
                      )
                    }
                  >
                    Delete
                  </Button>

                  

                </Group>

              </Stack>
            </Card>
          )
        )}
      </SimpleGrid>
    </Container>
  );
}

export default OwnerRestaurants;
import {
  Container,
  Title,
  Paper,
  Text,
  Stack,
} from "@mantine/core";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

function OwnerReviews() {

  const [restaurants,
    setRestaurants] =
    useState([]);

  useEffect(() => {

    const fetchReviews =
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
                  Authorization:
                    `Bearer ${token}`,
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

    fetchReviews();

  }, []);

  return (
    <Container
      size="md"
      py="xl"
    >

      <Title mb="xl">
        Customer Reviews
      </Title>

      <Stack>

        {restaurants.map(
          (restaurant) => (

            restaurant.reviews?.map(
              (
                review,
                index
              ) => (

                <Paper
                  key={index}
                  shadow="sm"
                  p="md"
                  radius="md"
                >

                  <Text fw={700}>
                    ⭐ {review.rating}
                    {" - "}
                    {review.userName}
                  </Text>

                  <Text c="dimmed">
                    {review.comment}
                  </Text>

                  <Text
                    mt="sm"
                    size="sm"
                    c="orange"
                  >
                    {
                      restaurant.restaurantName
                    }
                  </Text>

                </Paper>
              )
            )
          )
        )}

      </Stack>
    </Container>
  );
}

export default OwnerReviews;
import { useEffect, useState } from "react";

import {
  Container,
  Title,
  SimpleGrid,
} from "@mantine/core";

import API from "../services/api";

import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const [restaurants, setRestaurants] =
    useState([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const res = await API.get(
          "/restaurants"
        );

        setRestaurants(res.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    };

    loadRestaurants();
  }, []);

  return (
    <Container size="xl" py="xl">
      <Title ta="center" mb="xl">
        All Restaurants
      </Title>

      <SimpleGrid cols={3}>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Restaurants;
import { useEffect, useState } from "react";

import API from "../services/api";

import RestaurantCard from "../components/RestaurantCard";

import { Container, Title, SimpleGrid } from "@mantine/core";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants");

      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size="lg">
      <Title
        order={2}
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        Discover Amazing Restaurants
      </Title>

      <SimpleGrid cols={3} spacing="lg">
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

export default Home;
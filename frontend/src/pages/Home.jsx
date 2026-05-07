import {
  Container,
  Title,
  Text,
  Button,
  Grid,
  Image,
  SimpleGrid,
} from "@mantine/core";



import { useEffect, useState } from "react";

import API from "../services/api";

import RestaurantCard from "../components/RestaurantCard";

import { Link } from "react-router-dom";

function Home() {
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

  // Featured restaurant
  

  return (
    <>
      {/* HERO SECTION */}
      <Container size="xl" py={50}>
        <Grid align="center">
          {/* LEFT */}
          <Grid.Col span={6}>
            <Text
              c="orange"
              fw={700}
              mb="sm"
            >
              FRESH & DELICIOUS
            </Text>

            <Title
              order={1}
              size="55px"
              lh={1.2}
            >
              Delicious Food
              <br />
              With Wonderful
              <span
                style={{
                  color: "#f59f00",
                }}
              >
                {" "}
                Dining
              </span>
            </Title>

            <Text
              c="dimmed"
              mt="lg"
              size="lg"
            >
              Reserve tables at the
              best restaurants and
              enjoy premium dining
              experiences.
            </Text>

            <Button
              component={Link}
              to="/restaurants"
              color="orange"
              size="lg"
              radius="xl"
              mt="xl"
            >
              Explore Restaurants
            </Button>
          </Grid.Col>

          {/* RIGHT */}
          <Grid.Col span={6}>
            <Image
              src="https://images.unsplash.com/photo-1547592180-85f173990554"
              radius="50%"
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* RESTAURANTS SECTION */}

      <Container id="restaurants" size="xl" py="xl">
        <Title ta="center" mb="xl">
          Popular Restaurants
        </Title>

        <SimpleGrid cols={3}>
          {restaurants.map(
            (restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
              />
            )
          )}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Home;
import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import API from "../services/api";

import {
  Container,
  Image,
  Title,
  Text,
  Button,
  Paper,
  Group,
  SimpleGrid,
  Card,
  Tabs
} from "@mantine/core";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] =
    useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await API.get(
          `/restaurants/${id}`
        );

        setRestaurant(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container size="md" py="xl">
      <Paper shadow="md" p="lg" radius="md">
        {/* Image */}
        <Image
          src={restaurant.image}
          height={350}
          radius="md"
        />

        {/* Title */}
        <Title mt="lg">
          {restaurant.restaurantName}
        </Title>

        {/* Info */}
        <Group mt="md">
          <Text fw={600}>
            🍽 {restaurant.cuisine}
          </Text>

          <Text>
            📍 {restaurant.city}
          </Text>
        </Group>

        <Text mt="sm">
          ⏰ {restaurant.openingTime} -{" "}
          {restaurant.closingTime}
        </Text>

        <Text mt="sm">
          📞 {restaurant.phoneNumber}
        </Text>

        <Text mt="sm">
          📍 {restaurant.address}
        </Text>

        <Tabs defaultValue="about" mt="xl">
          <Tabs.List grow>
            <Tabs.Tab value="about">
              About
            </Tabs.Tab>
          
            <Tabs.Tab value="menu">
              Menu
            </Tabs.Tab>
          
            <Tabs.Tab value="reviews">
              Reviews
            </Tabs.Tab>
          </Tabs.List>
          
          {/* ABOUT */}
          <Tabs.Panel value="about" pt="md">
            <Text c="dimmed">
              {restaurant.description}
            </Text>
          </Tabs.Panel>
          
          {/* MENU */}
          <Tabs.Panel value="menu" pt="md">
            <SimpleGrid cols={3}>
              {restaurant.menu?.map(
                (item, index) => (
                  <Card
                    key={index}
                    shadow="sm"
                    radius="md"
                    withBorder
                  >
                    <Card.Section>
                      <Image
                        src={item.image}
                        height={180}
                      />
                    </Card.Section>
                
                    <Text fw={600} mt="sm">
                      {item.itemName}
                    </Text>
                
                    <Text
                      c="orange"
                      fw={700}
                    >
                      ₹ {item.price}
                    </Text>
                  </Card>
                )
              )}
            </SimpleGrid>
          </Tabs.Panel>

          {/* REVIEWS */}
          <Tabs.Panel value="reviews" pt="md">
            {Array.isArray(
              restaurant.reviews
            ) &&
              restaurant.reviews.map(
                (review, index) => (
                  <Paper
                    key={index}
                    shadow="xs"
                    p="md"
                    mb="md"
                  >
                    <Text fw={600}>
                      ⭐ {review.rating} -{" "}
                      {review.userName}
                    </Text>
          
                    <Text c="dimmed">
                      {review.comment}
                    </Text>
                  </Paper>
                )
              )
            }
          </Tabs.Panel>
        </Tabs>    
        

        {/* Button */}
        <Button
          component={Link}
          to={`/restaurant/${restaurant._id}/book`}
          color="orange"
          fullWidth
          mt="xl"
        >
          Reserve a Table
        </Button>
      </Paper>
    </Container>
  );
}

export default RestaurantDetails;
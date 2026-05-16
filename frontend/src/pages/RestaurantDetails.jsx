import { useEffect, useMemo, useState } from "react";

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
  Tabs,
  Stack,
  TextInput,
  Textarea,
  Rating,
  
} from "@mantine/core";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] =
    useState(null);

  const [reviewName, setReviewName] =
    useState("");
  const [reviewRating, setReviewRating] =
    useState(5);
  const [reviewComment, setReviewComment] =
    useState("");

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

  const reviews =
    restaurant?.reviews && Array.isArray(restaurant.reviews)
      ? restaurant.reviews
      : [];

  const canSubmit = useMemo(() => {
    return (
      reviewName.trim().length > 0 &&
      reviewComment.trim().length > 0 &&
      reviewRating >= 1 &&
      reviewRating <= 5
    );
  }, [reviewName, reviewComment, reviewRating]);

  const handleSubmitReview = async () => {
    if (!restaurant) return;
    if (!canSubmit) return;

    try {
      const payload = {
        userName: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim(),
      };

      const res = await API.post(
        `/reviews/restaurants/${restaurant._id}/reviews`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      const updatedRestaurant =
        res.data?.restaurant ||
        res.data;

      setRestaurant(updatedRestaurant);

      setReviewName("");
      setReviewRating(5);
      setReviewComment("");
    } catch (error) {
      console.log(error);
      // Avoid blocking UX; user can retry.
    }
  };

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
        <Title mt="lg">{restaurant.restaurantName}</Title>

        {/* Info */}
        <Group mt="md">
          <Text fw={600}>🍽 {restaurant.cuisine}</Text>
          <Text>📍 {restaurant.city}</Text>
        </Group>

        <Text mt="sm">
          ⏰ {restaurant.openingTime} - {restaurant.closingTime}
        </Text>

        <Text mt="sm">📞 {restaurant.phoneNumber}</Text>
        <Text mt="sm">📍 {restaurant.address}</Text>

        <Tabs defaultValue="about" mt="xl">
          <Tabs.List grow>
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="menu">Menu</Tabs.Tab>
            <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
          </Tabs.List>

          {/* ABOUT */}
          <Tabs.Panel value="about" pt="md">
            <Text c="dimmed">{restaurant.description}</Text>
          </Tabs.Panel>

          {/* MENU */}
          <Tabs.Panel value="menu" pt="md">
            <SimpleGrid cols={3}>
              {restaurant.menu?.map((item, index) => (
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

                  <Text c="orange" fw={700}>
                    ₹ {item.price}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Tabs.Panel>

          {/* REVIEWS */}
                    
          <Tabs.Panel
            value="reviews"
            pt="md"
          >
                      
            {/* EXISTING REVIEWS */}
                      
            {Array.isArray(
              restaurant.reviews
            ) &&
              restaurant.reviews.map(
                (
                  review,
                  index
                ) => (
                
                  <Paper
                    key={index}
                    shadow="xs"
                    p="md"
                    mb="md"
                    radius="md"
                    withBorder
                  >
                  
                    <Text fw={600}>
                      ⭐ {review.rating} -{" "}
                      {review.userName}
                    </Text>
                
                    <Text
                      c="dimmed"
                      mt="xs"
                    >
                      {review.comment}
                    </Text>
                
                  </Paper>
                )
              )
            }
          
            {/* ADD REVIEW */}
          
            <Paper
              shadow="sm"
              p="lg"
              mt="xl"
              radius="md"
              withBorder
            >
            
              <Title
                order={4}
                mb="md"
              >
                Add Your Review
              </Title>
          
              <TextInput
                label="Your Name"
                placeholder="Enter your name"
                value={reviewName}
                onChange={(e) =>
                  setReviewName(
                    e.target.value
                  )
                }
              />
          
              <Rating
                value={reviewRating}
                onChange={setReviewRating}
                mt="md"
              />
          
              <Textarea
                label="Your Review"
                placeholder="Share your dining experience..."
                mt="md"
                minRows={4}
                value={reviewComment}
                onChange={(e) =>
                  setReviewComment(
                    e.target.value
                  )
                }
              />
          
              <Button
                color="orange"
                mt="lg"
                fullWidth
                onClick={handleSubmitReview}
              >
                Submit Review
              </Button>
          
            </Paper>
          
          </Tabs.Panel>
        </Tabs>
        {/* Button */}
        <Button
          component={Link}
          to={localStorage.getItem("token") ? `/restaurant/${restaurant._id}/book` : "/login"}
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

function DividerLine() {
  return (
    <div
      style={{
        height: 1,
        background: "var(--mantine-color-gray-3)",
        width: "100%",
      }}
    />
  );
}

export default RestaurantDetails;


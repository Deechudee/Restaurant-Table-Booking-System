import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
} from "@mantine/core";

import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        width: "350px",
      }}
    >
      <Card.Section>
        <Image
          src={restaurant.image}
          height={220}
          alt={restaurant.restaurantName}
        />
      </Card.Section>

      <Group
        justify="space-between"
        mt="md"
        mb="xs"
      >
        <Text fw={700} size="lg">
          {restaurant.restaurantName}
        </Text>

        <Badge color="orange">
          {restaurant.cuisine}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        📍 {restaurant.city}
      </Text>

      <Text size="sm" mt="5">
        ⏰ {restaurant.openingTime} -{" "}
        {restaurant.closingTime}
      </Text>

      <Text
        size="sm"
        mt="10"
        lineClamp={2}
      >
        {restaurant.description}
      </Text>

      <Button
        component={Link}
        to={`/restaurant/${restaurant._id}`}
        color="orange"
        fullWidth
        mt="md"
        radius="md"
      >
        View Details
      </Button>
    </Card>
  );
}

export default RestaurantCard;
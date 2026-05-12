import { useEffect, useState } from "react";

import API from "../services/api";

import {
  Container,
  Title,
  Card,
  Text,
  Stack,
  Badge,
} from "@mantine/core";

function MyBookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    const fetchBookings =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res = await API.get(
            "/bookings/my-bookings",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setBookings(res.data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchBookings();
  }, []);

  return (
    <Container size="md" py="xl">
      <Title ta="center" mb="xl">
        My Bookings
      </Title>

      <Stack>
        {bookings.map((booking) => (
          <Card
            key={booking._id}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Text fw={700}>
              {
                booking.restaurant
                  ?.restaurantName
              }
            </Text>

            <Text mt="sm">
              📅{" "}
              {booking.bookingDate}
            </Text>

            <Text>
              ⏰{" "}
              {booking.bookingTime}
            </Text>

            <Text>
              👥 Guests:{" "}
              {booking.guestsCount}
            </Text>

            <Text>
              📞{" "}
              {booking.contactNumber}
            </Text>

            <Text mt="sm">
              Request:{" "}
              {
                booking.specialRequest
              }
            </Text>

            <Badge
              color={
                booking.bookingStatus ===
                "Confirmed"
                  ? "green"
                  : booking.bookingStatus ===
                    "Cancelled"
                  ? "red"
                  : "yellow"
              }
            >
              {booking.bookingStatus}
            </Badge>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default MyBookings;
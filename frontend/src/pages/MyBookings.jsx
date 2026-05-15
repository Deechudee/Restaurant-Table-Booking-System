import { useEffect, useState } from "react";

import API from "../services/api";

import {
  Container,
  Title,
  Card,
  Text,
  Stack,
  Badge,
  Button,
  Group,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";

function MyBookings() {
  const [bookings, setBookings] =
    useState([]);

  const fetchBookings = async () => {
    try {
      const token =
        localStorage.getItem("token");

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

  useEffect(() => {
    const run = async () => {
      await fetchBookings();
    };

    run();
  }, []);


  const getBookingDateTime = (booking) => {
    const { bookingDate, bookingTime } = booking || {};
    if (!bookingDate || !bookingTime) return null;

    // bookingTime could be HH:mm or HH:mm:ss
    const normalizedTime =
      bookingTime.length === 5
        ? `${bookingTime}:00`
        : bookingTime;

    const dt = new Date(
      `${bookingDate}T${normalizedTime}`
    );
    return Number.isNaN(dt.getTime()) ? null : dt;
  };

  const isCancellationAllowed = (booking) => {
    const dt = getBookingDateTime(booking);
    if (!dt) return true; // if we can't parse, don't block UI (backend still enforces)

    const diffMs = dt.getTime() - new Date().getTime();
    return diffMs > 60 * 60 * 1000; // more than 1 hour
  };

  const cancelBooking = async (bookingId) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      notifications.show({
        title: "Cancelled",
        message: "Booking cancelled successfully",
        color: "green",
      });

      fetchBookings();
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        "Cancel failed";

      notifications.show({
        title: "Error",
        message,
        color: "red",
      });
    }
  };

  return (
    <Container size="md" py="xl">
      <Title ta="center" mb="xl">
        My Bookings
      </Title>

      <Stack>
        {bookings.map((booking) => {
          const canCancel =
            isCancellationAllowed(booking);

          return (
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
                📅 {booking.bookingDate}
              </Text>

              <Text>
                ⏰ {booking.bookingTime}
              </Text>

              <Text>
                👥 Guests: {booking.guestsCount}
              </Text>

              <Text>
                📞 {booking.contactNumber}
              </Text>

              <Text mt="sm">
                Request: {booking.specialRequest}
              </Text>

              <Badge
                mt="sm"
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

              <Group mt="md" justify="flex-end">
                <Button
                  color="red"
                  disabled={
                    booking.bookingStatus ===
                      "Cancelled" ||
                    !canCancel
                  }
                  onClick={() =>
                    cancelBooking(booking._id)
                  }
                >
                  Cancel
                </Button>
              </Group>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}

export default MyBookings;


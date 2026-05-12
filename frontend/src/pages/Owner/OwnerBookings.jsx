import { useEffect, useState } from "react";



import API from "../../services/api";

import {
  Container,
  Title,
  Table,
  Paper,
  Group,
  Button,
  Badge,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";

function OwnerBookings() {

  

  const [bookings, setBookings] =
    useState([]);

  // FETCH BOOKINGS

  useEffect(() => {

    const loadBookings =
      async () => {
  
        try {
  
          const token =
            localStorage.getItem(
              "token"
            );
  
          const res =
            await API.get(
              "/bookings/owner-bookings",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
          setBookings(
            res.data.bookings
          );
  
        } catch (error) {
  
          console.log(error);
        }
      };
  
    loadBookings();
  
  }, []);

  // UPDATE STATUS

  const updateBookingStatus =
    async (
      bookingId,
      status
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          `/bookings/status/${bookingId}`,
          {
            bookingStatus: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        notifications.show({
          title: "Success",
          message:
            `Booking ${status}`,
          color:
            status ===
            "Confirmed"
              ? "green"
              : "red",
        });

        window.location.reload();

      } catch (error) {

        console.log(error);

        notifications.show({
          title: "Error",
          message:
            "Status update failed",
          color: "red",
        });
      }
    };

  return (
    <Container
      size="xl"
      py="xl"
    >

      <Title mb="xl">
        Restaurant Bookings
      </Title>

      <Paper
        shadow="md"
        p="md"
        radius="md"
      >

        <Table
          striped
          highlightOnHover
        >

          <Table.Thead>
            <Table.Tr>

              <Table.Th>
                Customer
              </Table.Th>

              <Table.Th>
                Date
              </Table.Th>

              <Table.Th>
                Time
              </Table.Th>

              <Table.Th>
                Guests
              </Table.Th>

              <Table.Th>
                Contact
              </Table.Th>

              <Table.Th>
                Request
              </Table.Th>

              <Table.Th>
                Status
              </Table.Th>

              <Table.Th>
                Actions
              </Table.Th>

            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>

            {bookings.map(
              (booking) => (

                <Table.Tr
                  key={booking._id}
                >

                  <Table.Td>
                    {
                      booking.customer
                        ?.name
                    }
                  </Table.Td>

                  <Table.Td>
                    {
                      booking.bookingDate
                    }
                  </Table.Td>

                  <Table.Td>
                    {
                      booking.bookingTime
                    }
                  </Table.Td>

                  <Table.Td>
                    {
                      booking.guestsCount
                    }
                  </Table.Td>

                  <Table.Td>
                    {
                      booking.contactNumber
                    }
                  </Table.Td>

                  <Table.Td>
                    {
                      booking.specialRequest
                    }
                  </Table.Td>

                  <Table.Td>

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
                      {
                        booking.bookingStatus
                      }
                    </Badge>

                  </Table.Td>

                  <Table.Td>

                    <Group>

                      <Button
                        color="green"
                        size="xs"
                        onClick={() =>
                          updateBookingStatus(
                            booking._id,
                            "Confirmed"
                          )
                        }
                      >
                        Confirm
                      </Button>

                      <Button
                        color="red"
                        size="xs"
                        onClick={() =>
                          updateBookingStatus(
                            booking._id,
                            "Cancelled"
                          )
                        }
                      >
                        Cancel
                      </Button>

                    </Group>

                  </Table.Td>

                </Table.Tr>
              )
            )}

          </Table.Tbody>

        </Table>

      </Paper>
    </Container>
  );
}

export default OwnerBookings;
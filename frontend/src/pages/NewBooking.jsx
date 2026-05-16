import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";


import API from "../services/api";

import {
  Container,
  Paper,
  Title,
  TextInput,
  Button,
  NumberInput,
  Textarea,
} from "@mantine/core";

function NewBooking() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] =
    useState({
      date: "",
      startTime: "",
      endTime: "",
      guests: 2,
      contactNumber: "",
      specialRequest: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book a table");
      navigate("/login", { replace: true });
      return;
    }


    try {
      // Backend is protected; this is an extra client-side guard.
      await API.post(
       "/bookings",

       {
         restaurant: id,
     
         guestsCount:
           formData.guests,
     
         bookingDate:
           formData.date,
     
         startTime:
           formData.startTime,
 
         endTime:
           formData.endTime,
     
         specialRequest:
           formData.specialRequest,
     
         contactNumber:
           formData.contactNumber,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
      );

      alert("Table Reserved!");
    } catch (error) {
      console.log(error);

      alert("Booking failed");
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" p="lg">
        <Title order={2} ta="center">
          Reserve a Table
        </Title>

        <form onSubmit={handleBooking}>
          <TextInput
            mt="md"
            label="Date"
            type="date"
            name="date"
            onChange={handleChange}
          />

          <TextInput
            mt="md"
            label="Start Time"
            type="time"
            name="startTime"
            onChange={handleChange}
          />

          <TextInput
            mt="md"
            label="End Time"
            type="time"
            name="endTime"
            onChange={handleChange}
          />

          <NumberInput
            mt="md"
            label="Guests"
            min={1}
            max={10}
            value={formData.guests}
            onChange={(value) =>
              setFormData({
                ...formData,
                guests: value,
              })
            }
          />
          <TextInput
            mt="md"
            label="Contact Number"
            name="contactNumber"
            onChange={handleChange}
          />

          <Textarea
            mt="md"
            label="Special Request"
            name="specialRequest"
            placeholder="Birthday, window seat..."
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            color="orange"
            mt="xl"
          >
            Confirm Booking
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default NewBooking;
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Title,
  Stack,
} from "@mantine/core";

import API from "../../services/api";

import { notifications } from "@mantine/notifications";

function EditRestaurant() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      restaurantName: "",
      description: "",
      address: "",
      availableSeats: 20,
      image: "",
      cuisine: "",
      city: "",
      area: "",
      openingTime: "",
      closingTime: "",
      phoneNumber: "",
      maxGuests: 1,
    });

  // FETCH RESTAURANT

  useEffect(() => {

    const loadRestaurant =
      async () => {
      
        try {
      
          const token =
            localStorage.getItem(
              "token"
            );
          
          const res =
            await API.get(
              `/restaurants/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          
          setFormData(
            res.data
          );
      
        } catch (error) {
      
          console.log(error);
        }
      };
  
    loadRestaurant();
  
  }, [id]);

  // HANDLE CHANGE

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value.trim(),
    });
  };

  // UPDATE RESTAURANT

  const handleUpdate =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          `/restaurants/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        notifications.show({
          title: "Success",
          message:
            "Restaurant updated successfully",
          color: "green",
        });

        navigate(
          "/owner/restaurants"
        );

      } catch (error) {

        console.log(error);

        notifications.show({
          title: "Error",
          message:
            "Update failed",
          color: "red",
        });
      }
    };

  return (
    <Container
      size="md"
      py="xl"
    >
      <Paper
        shadow="md"
        p="xl"
        radius="md"
      >
        <Title mb="xl">
          Edit Restaurant
        </Title>

        <Stack>

          <TextInput
            label="Restaurant Name"
            name="restaurantName"
            value={
              formData.restaurantName
            }
            onChange={
              handleChange
            }
          />

          <Textarea
            label="Description"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <TextInput
            label="Cuisine"
            name="cuisine"
            value={
              formData.cuisine
            }
            onChange={
              handleChange
            }
          />

          <TextInput
            label="City"
            name="city"
            value={
              formData.city
            }
            onChange={
              handleChange
            }
          />

          <TextInput
            label="Area"
            name="area"
            value={
              formData.area
            }
            onChange={
              handleChange
            }
          />

          <TextInput
            label="Opening Time"
            name="openingTime"
            value={
              formData.openingTime
            }
            onChange={
              handleChange
            }
          />

          <TextInput
            label="Closing Time"
            name="closingTime"
            value={
              formData.closingTime
            }
            onChange={
              handleChange
            }
          />

          <TextInput
            label="Phone Number"
            name="phoneNumber"
            value={
              formData.phoneNumber
            }
            onChange={
              handleChange
            }
          />

          <NumberInput
            label="Max Guests"
            value={
              formData.maxGuests
            }
            onChange={(value) =>
              setFormData({
                ...formData,
                maxGuests: value,
              })
            }
          />

          <TextInput
            label="Address"
            name="address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
          />

          <NumberInput
            label="Available Seats"
            value={
              formData.availableSeats
            }
            onChange={(value) =>
              setFormData({
                ...formData,
                availableSeats:
                  value,
              })
            }
          />

          <TextInput
            label="Image URL"
            name="image"
            value={
              formData.image
            }
            onChange={
              handleChange
            }
          />

          <Button
            color="orange"
            onClick={
              handleUpdate
            }
          >
            Update Restaurant
          </Button>

        </Stack>
      </Paper>
    </Container>
  );
}

export default EditRestaurant;
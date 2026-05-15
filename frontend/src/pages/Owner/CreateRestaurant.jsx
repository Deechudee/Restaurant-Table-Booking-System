import { useState } from "react";

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

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import { notifications } from "@mantine/notifications";

function CreateRestaurant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
      };

      await API.post(
        "/restaurants",
        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notifications.show({
        title: "Success",
        message: "Restaurant created successfully",
        color: "green",
      });

      navigate("/owner/restaurants");
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Error",
        message: "Create failed",
        color: "red",
      });
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Title mb="xl">Create Restaurant</Title>

        <Stack>
          <TextInput
            label="Restaurant Name"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <TextInput
            label="Cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="Indian / Chinese / Japanese ..."
          />

          <TextInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <TextInput
            label="Area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="North / South / East / West / Central"
          />

          <TextInput
            label="Opening Time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
          />

          <TextInput
            label="Closing Time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
          />

          <TextInput
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <NumberInput
            label="Max Guests"
            value={formData.maxGuests}
            min={1}
            step={1}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                maxGuests: value || 1,
              }))
            }
          />

          <TextInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <NumberInput
            label="Available Seats"
            value={formData.availableSeats}
            min={1}
            step={1}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                availableSeats: value || 1,
              }))
            }
          />

          <TextInput
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />

          <Button color="orange" onClick={handleCreate}>
            Create Restaurant
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default CreateRestaurant;


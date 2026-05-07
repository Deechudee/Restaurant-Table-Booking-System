import { useState } from "react";

import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  BackgroundImage,
  Overlay,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { Link } from "react-router-dom";

import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        formData
      );

      notifications.show({
        title: "Success",
        message:
          "Account created successfully",
        color: "green",
      });

      window.location.href = "/login";
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Error",
        message: "Registration failed",
        color: "red",
      });
    }
  };

  return (
    <BackgroundImage
      src="https://images.unsplash.com/photo-1514933651103-005eec06c04b"
      style={{
        minHeight: "100vh",
      }}
    >
      <Overlay
        color="#000"
        opacity={0.7}
        zIndex={0}
      />

      <Container
        size={450}
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "60px",
        }}
      >
        <Title
          ta="center"
          c="white"
          fw={800}
          style={{
            fontSize: "42px",
          }}
        >
          DineFlow 🍽️
        </Title>

        <Text
          ta="center"
          c="gray.3"
          mt="sm"
        >
          Discover and reserve tables at premium restaurants
        </Text>

        <Paper
          shadow="xl"
          radius="lg"
          p="xl"
          mt="xl"
          style={{
            backdropFilter: "blur(12px)",
            background:
              "rgba(255,255,255,0.12)",
            border:
              "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Full Name"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              required
              styles={{
                input: {
                  background:
                    "rgba(255,255,255,0.1)",
                  color: "white",
                  border:
                    "1px solid rgba(255,255,255,0.2)",
                },
                label: {
                  color: "white",
                },
              }}
            />

            <TextInput
              mt="md"
              label="Email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              required
              styles={{
                input: {
                  background:
                    "rgba(255,255,255,0.1)",
                  color: "white",
                  border:
                    "1px solid rgba(255,255,255,0.2)",
                },
                label: {
                  color: "white",
                },
              }}
            />

            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Create password"
              name="password"
              onChange={handleChange}
              required
              styles={{
                input: {
                  background:
                    "rgba(255,255,255,0.1)",
                  color: "white",
                  border:
                    "1px solid rgba(255,255,255,0.2)",
                },
                label: {
                  color: "white",
                },
              }}
            />

            <Button
              fullWidth
              mt="xl"
              size="md"
              radius="xl"
              color="orange"
              type="submit"
            >
              Create Account
            </Button>
          </form>

          <Box mt="lg">
            <Text
              ta="center"
              c="gray.2"
            >
              Already have an account?{" "}
              <Text
                component={Link}
                to="/login"
                c="yellow"
                fw={700}
                style={{
                  textDecoration: "none",
                }}
              >
                Login
              </Text>
            </Text>
          </Box>
        </Paper>
      </Container>
    </BackgroundImage>
  );
}

export default Register;


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

function Login() {
  

  const [formData, setFormData] = useState({
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
      const res = await API.post(
        "/auth/login",
        formData
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      notifications.show({
        title: "Success",
        message: "Login successful",
        color: "green",
      });

      if (res.data.role === "owner") {
        window.location.href = "/owner";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Error",
        message: "Invalid credentials",
        color: "red",
      });
    }
  };

  return (
    <BackgroundImage
      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
      style={{
        minHeight: "100vh",
      }}
    >
      <Overlay
        color="#000"
        opacity={0.65}
        zIndex={0}
      />

      <Container
        size={420}
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "80px",
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
          Welcome Back 🍽️
        </Title>

        <Text
          ta="center"
          c="gray.3"
          mt="sm"
        >
          Reserve tables at your favorite restaurants
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
              placeholder="Enter password"
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
              Login
            </Button>
          </form>

          <Box mt="lg">
            <Text
              ta="center"
              c="gray.2"
            >
              Don&apos;t have an account?{" "}
              <Text
                component={Link}
                to="/register"
                c="yellow"
                fw={700}
                style={{
                  textDecoration: "none",
                }}
              >
                Register
              </Text>
            </Text>
          </Box>
        </Paper>
      </Container>
    </BackgroundImage>
  );
}

export default Login;


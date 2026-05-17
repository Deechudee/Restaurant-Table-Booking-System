import { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Divider,
  Loader,
} from "@mantine/core";

import API from "../../services/api";

function OwnerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Not authenticated");
          return;
        }

        const res = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (e) {
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <Container size="sm" py="xl">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        style={{
          background:
            "linear-gradient(180deg, rgba(255,165,0,0.08) 0%, rgba(0,0,0,0) 120%)",
          borderColor: "rgba(255,165,0,0.25)",
        }}
      >
        <Stack spacing="md">
          <Group position="apart" align="center" noWrap>
            <Group spacing="sm" align="center">
              <Text size="xl" fw={800} c="orange">
                👩‍🍳
              </Text>
              <Title order={2}>Owner Profile</Title>
            </Group>

            <Badge
              color="orange"
              variant="light"
              radius="sm"
            >
              Owner
            </Badge>
          </Group>

          <Divider />

          {loading ? (
            <Group justify="center" my="xl">
              <Loader />
            </Group>
          ) : error ? (
            <Text c="red" fw={600}>
              {error}
            </Text>
          ) : (
            <Stack spacing="xs">
              <Text size="sm" c="dimmed">
                Name
              </Text>
              <Text fw={700} size="lg">
                {profile?.name || "—"}
              </Text>

              <Text
                size="sm"
                c="dimmed"
                mt="sm"
              >
                Email
              </Text>
              <Text
                fw={600}
                size="md"
                style={{ wordBreak: "break-word" }}
              >
                {profile?.email || "—"}
              </Text>

              <Text size="sm" c="dimmed" mt="sm">
                Role
              </Text>
              <Text fw={700} size="md">
                {profile?.role || "Owner"}
              </Text>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default OwnerProfile;


import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Badge,
  Divider,
} from "@mantine/core";

function OwnerProfile() {
  return (
    <Container
      size="sm"
      py="xl"
    >
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        style={{
          background: "linear-gradient(180deg, rgba(255,165,0,0.08) 0%, rgba(0,0,0,0) 120%)",
          borderColor: "rgba(255,165,0,0.25)",
        }}
      >
        <Stack spacing="md">
          <Group position="apart" align="center" noWrap>
            <Group spacing="sm" align="center">
              <Text
                size="xl"
                fw={800}
                c="orange"
              >
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

          <Stack spacing="xs">
            <Text
              size="sm"
              c="dimmed"
            >
              Name
            </Text>
            <Text
              fw={700}
              size="lg"
            >
              Deekshitha
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
              owner@gmail.com
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt="sm"
            >
              Role
            </Text>
            <Text
              fw={700}
              size="md"
            >
              Owner
            </Text>
          </Stack>

          
        </Stack>
      </Paper>
    </Container>
  );
}

export default OwnerProfile;

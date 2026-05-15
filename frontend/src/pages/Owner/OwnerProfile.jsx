import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
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
      >

        <Title mb="lg">
          Owner Profile
        </Title>

        <Stack>

          <Text>
            Name: Deekshitha
          </Text>

          <Text>
            Email: owner@gmail.com
          </Text>

          <Text>
            Role: Owner
          </Text>

          <Button color="orange">
            Edit Profile
          </Button>

        </Stack>

      </Paper>
    </Container>
  );
}

export default OwnerProfile;
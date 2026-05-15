import { useEffect, useMemo, useState } from "react";

import {
  Container,
  Title,
  Card,
  Text,
  Stack,
  Group,
  TextInput,
  NumberInput,
  Button,
  Divider,
  Select,
} from "@mantine/core";

import API from "../../services/api";

function OwnerMenu() {
  const token = localStorage.getItem("token");

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRestaurantId, setSelectedRestaurantId] =
    useState(null);

  // menu item form
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  // editing state
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          "/restaurants/owner/my-restaurants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.restaurants || [];

        setRestaurants(list);

        if (!selectedRestaurantId && list?.length) {
          setSelectedRestaurantId(list[0]._id);
        }
      } catch (e) {
        console.log(e);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRestaurant = useMemo(
    () =>
      restaurants.find((r) => r._id === selectedRestaurantId) || null,
    [restaurants, selectedRestaurantId]
  );

  const menuItems = selectedRestaurant?.menu || [];

  const persistRestaurantMenu = async (restaurantId, nextMenu) => {
    const res = await API.put(
      `/restaurants/${restaurantId}`,
      { menu: nextMenu },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedRestaurant =
      res.data?.updatedRestaurant ||
      res.data?.restaurant ||
      res.data;

    setRestaurants((prev) =>
      prev.map((r) =>
        r._id === updatedRestaurant?._id ? updatedRestaurant : r
      )
    );

    return updatedRestaurant;
  };

  const resetForm = () => {
    setItemName("");
    setPrice(0);
    setImage("");
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const m = menuItems[index];
    if (!m) return;

    setEditingIndex(index);
    setItemName(m.itemName || "");
    setPrice(m.price || 0);
    setImage(m.image || "");
  };

  const handleDelete = async (index) => {
    if (!selectedRestaurant) return;

    const nextMenu = menuItems.filter((_, idx) => idx !== index);
    await persistRestaurantMenu(selectedRestaurant._id, nextMenu);

    // if we deleted the item being edited, reset
    if (editingIndex === index) {
      resetForm();
    }
  };

  const handleUpsert = async () => {
    if (!selectedRestaurant) return;
    if (!itemName.trim()) return;

    const currentMenu = menuItems || [];

    const newItem = {
      itemName,
      price,
      image: image || undefined,
    };

    const nextMenu =
      editingIndex !== null
        ? currentMenu.map((it, idx) =>
            idx === editingIndex ? newItem : it
          )
        : [...currentMenu, newItem];

    await persistRestaurantMenu(selectedRestaurant._id, nextMenu);
    resetForm();
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Title>Loading menu...</Title>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title mb="md">Restaurant Menu</Title>

      {!restaurants?.length ? (
        <Card shadow="sm" padding="md" radius="md">
          <Text c="dimmed">
            No restaurant found for this owner. Create a restaurant first.
          </Text>
        </Card>
      ) : (
        <Stack spacing="md">
          <Card shadow="sm" padding="md" radius="md">
            <Group position="apart" align="center">
              <div>
                <Text c="dimmed">Select restaurant</Text>
                <Title order={4}>
                  {selectedRestaurant?.restaurantName || ""}
                </Title>
              </div>

              <div style={{ minWidth: 260 }}>
                <Select
                  label="Restaurant"
                  data={restaurants.map((r) => ({
                    value: r._id,
                    label: r.restaurantName,
                  }))}
                  value={selectedRestaurantId}
                  onChange={(v) => {
                    setSelectedRestaurantId(v);
                    resetForm();
                  }}
                  searchable
                />
              </div>
            </Group>
          </Card>

          <Card shadow="sm" padding="md" radius="md">
            <Title order={4} mb="md">
              {editingIndex !== null ? "Edit menu item" : "Add menu item"}
            </Title>

            <Stack>
              <TextInput
                label="Item name"
                value={itemName}
                onChange={(e) => setItemName(e.currentTarget.value)}
                placeholder="e.g. Chicken Biryani"
              />

              <NumberInput
                label="Price"
                value={price}
                min={0}
                step={1}
                onChange={(v) => setPrice(v || 0)}
              />

              <TextInput
                label="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.currentTarget.value)}
                placeholder="https://..."
              />

              <Group position="apart" mt="sm">
                <Button
                  variant="light"
                  onClick={resetForm}
                  disabled={editingIndex === null && !itemName && !image}
                >
                  Clear
                </Button>

                <Group>
                  <Button
                    variant={editingIndex !== null ? "filled" : "default"}
                    onClick={handleUpsert}
                  >
                    {editingIndex !== null ? "Update" : "Add"}
                  </Button>
                </Group>
              </Group>
            </Stack>
          </Card>

          <Card shadow="sm" padding="md" radius="md">
            <Group position="apart" mb="sm">
              <Title order={4}>Menu items</Title>
              <Text c="dimmed">{menuItems.length} items</Text>
            </Group>

            <Divider mb="md" />

            <Stack>
              {menuItems.length ? (
                menuItems.map((m, idx) => (
                  <Card
                    key={m.itemName ? `${m.itemName}-${idx}` : idx}
                    padding="sm"
                    radius="md"
                    withBorder
                  >
                    <Group position="apart" mb={8}>
                      <div>
                        <Text fw={700}>{m.itemName}</Text>
                        <Text c="dimmed">Price: {m.price}</Text>
                      </div>

                      <Group spacing="xs">
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() => handleEdit(idx)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          color="red"
                          variant="light"
                          onClick={() => handleDelete(idx)}
                        >
                          Delete
                        </Button>
                      </Group>
                    </Group>

                    {m.image ? (
                      <Text mt="sm" c="dimmed" size="sm">
                        Image: {m.image}
                      </Text>
                    ) : null}
                  </Card>
                ))
              ) : (
                <Text c="dimmed">No menu items yet.</Text>
              )}
            </Stack>
          </Card>
        </Stack>
      )}
    </Container>
  );
}

export default OwnerMenu;


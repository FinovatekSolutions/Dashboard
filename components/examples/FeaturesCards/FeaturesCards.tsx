import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconCalendarMonth, IconGraph } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Browse',
    description: 'Search case studies in the database and apply different filters.',
    icon: IconSearch,
  },
  {
    title: 'Map',
    description: 'Select filters for the documents and show the locations of it in a map.',
    icon: IconMapPin,
  },
  {
    title: 'Timeline',
    description: 'Select document to visualize the timeline of it.',
    icon: IconCalendarMonth,
  },
  {
    title: 'Graph',
    description: 'Select filters and view a X vs Y plot to visualize the correlation.',
    icon: IconGraph,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.orange[8]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge
          variant="filled"
          color={theme.colors.orange[7]}
          size="lg"
          style={{ color: theme.colors['irene-dark-blue'][9] }}
        >
          Feature Spotlight
        </Badge>
      </Group>

      <Title order={2} c="white" ta="center" mt="sm">
        Explore the Impact of Natural Disasters Through Interactive Features
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Delve into comprehensive case studies with our intuitive browsing tools and dynamic
        visualizations.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}

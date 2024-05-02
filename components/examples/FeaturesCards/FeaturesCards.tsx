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
import Link from 'next/link';
import { IconSearch, IconFileTypeCsv, IconUsersGroup } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Classification',
    link: '/',
    description: 'Search case studies in the database and apply different filters.',
    icon: IconFileTypeCsv,
  },
  {
    title: 'Clients',
    link: '/clients',
    description: 'Select filters for the documents and show the locations of it in a map.',
    icon: IconUsersGroup,
  },
  {
    title: 'My Reviews',
    link: '/my-reviews',
    description: 'Select a document to visualize its timeline.',
    icon: IconSearch,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      component={Link}
      href={feature.link}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={2} color="#44c5f8" />
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
          color="#07A6CF"
          size="lg"
          c="white"
          // style={{ color: theme.colors.dark[0] }}
        >
          Feature Spotlight
        </Badge>
      </Group>

      <Title order={2} c="black" ta="center" mt="sm">
        Explore the Impact of Natural Disasters Through Interactive Features
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Delve into comprehensive case studies with our intuitive browsing tools and dynamic
        visualizations.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}

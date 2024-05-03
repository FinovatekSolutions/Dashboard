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
import { IconSearch, IconFileTypeCsv, IconUsersGroup, IconFileCheck } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Classification',
    link: '/classification',
    description: 'Select Bank Statements in CSV format for automatic Classificaton.',
    icon: IconFileTypeCsv,
  },
  {
    title: 'Clients',
    link: '/clients',
    description: 'View all current clients and relevant contact information.',
    icon: IconUsersGroup,
  },
  {
    title: 'Reviews',
    link: '/reviews',
    description: 'View all reviews realized with their respective details.',
    icon: IconSearch,
  },
  {
    title: 'My Reviews',
    link: '/my-reviews',
    description: 'Look at the reviews you have realized to a variety of clients.',
    icon: IconFileCheck,
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
          Key Features
        </Badge>
      </Group>

      <Title order={2} c="black" ta="center" mt="sm">
        Explore the Interactive Features of the Web Application
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Delve into financial analysis with our intuitive machine learning model for classifications
        and web implementations for client bank statement reviews.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}

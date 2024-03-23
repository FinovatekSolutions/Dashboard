import { Container, Title, Text, Button, SimpleGrid, Center, Box } from '@mantine/core';
import Link from 'next/link';
import classes from './NotFoundImage.module.css';

export function NotFoundImage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Center>
          <Title order={1} className={classes.label}>
            404
          </Title>
        </Center>
        <Box>
          <Title className={classes.title}>Nothing to see here...</Title>
          <Text c="dimmed" size="lg">
            The page you are trying to open does not exist. You may have mistyped the address, or
            the page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button
            component={Link}
            href="/"
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            Get back to home page
          </Button>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

import {
  Title,
  Text,
  Button,
  Container,
  useMantineTheme,
  Group,
  Space,
  Divider,
  Center,
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { Dots } from './Dots';
import classes from './HeroText.module.css';

export default function HeroText() {
  const theme = useMantineTheme();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title c="white" style={{ textAlign: 'center' }}>
          Lorem{' '}
          <Text
            component="span"
            className={classes.highlight}
            inherit
            variant="gradient"
            gradient={{
              from: theme.colors.orange[4],
              to: theme.colors.yellow[6],
            }}
          >
            Ipsum
          </Text>{' '}
          Yucateke
        </Title>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="sm" />
        <Text c="white" size="24px" mb={5} style={{ textAlign: 'center' }}>
          Welcome to{' '}
          <Group
            component="span"
            gap={0}
            style={{ display: 'inline-flex', alignItems: 'baseline' }}
          >
            <Text component="span" inherit c="white">
              Fi
            </Text>
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{
                from: theme.colors.orange[4],
                to: theme.colors.yellow[6],
              }}
            >
              nova
            </Text>
            <Text component="span" inherit c="white">
              tek
            </Text>
          </Group>
        </Text>

        <Container p={0} size={600}>
          <Divider my="md" color={theme.colors.dark[3]} />
          <Text size="lg" c={theme.colors.gray[3]} fw={500} className={classes.description}>
            This is a dasboard. This is a dasboard. This is a dasboard. This is a dasboard. This is
            a dasboard. This is a dasboard. This is a dasboard. This is a dasboard. This is a
            dasboard. This is a dasboard. This is a dasboard. This is a dasboard. This is a
            dasboard.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ/" // Your external link
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // For security reasons
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            rightSection={<IconExternalLink size={20} />}
          >
            Click this if you dare...
          </Button>
        </div>
      </div>
    </Container>
  );
}

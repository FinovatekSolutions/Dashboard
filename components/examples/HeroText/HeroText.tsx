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
        <Title c="black" style={{ textAlign: 'center' }}>
          Financial Radiographies
        </Title>
        <Title c="black" style={{ textAlign: 'center' }}>
          <Text
            component="span"
            className={classes.highlight}
            inherit
            variant="gradient"
            gradient={{
              from: '#1A1C27',
              to: '#44c5f8',
            }}
          ></Text>
        </Title>
        <Title c="black" style={{ textAlign: 'center' }}></Title>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="sm" />
        <Text c="black" size="24px" mb={5} style={{ textAlign: 'center' }}>
          Welcome to{' '}
          <Group
            component="span"
            gap={0}
            style={{ display: 'inline-flex', alignItems: 'baseline' }}
          >
            <Text component="span" inherit c="black">
              Fi
            </Text>
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{
                from: '#1A1C27',
                to: '#44c5f8',
              }}
            >
              nova
            </Text>
            <Text component="span" inherit c="black">
              tek
            </Text>
          </Group>
        </Text>

        <Container p={0} size={600}>
          <Divider my="md" color={theme.colors.dark[9]} />
          <Text size="lg" c={theme.colors.dark[9]} fw={500} className={classes.description}>
            This is an software that takes all of your clients bank statements and categorizes them
            using state of the art Machine Learning technology in order to agilize the
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ/" // Your external link
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // For security reasons
            className={classes.control}
            bg={'#44c5f8'}
            size="lg"
            variant="default"
            color="red"
            rightSection={<IconExternalLink size={20} color="white" />}
          >
            <Text fw={500} c={'white'}>
              Click this if you dare...
            </Text>
          </Button>
        </div>
      </div>
    </Container>
  );
}

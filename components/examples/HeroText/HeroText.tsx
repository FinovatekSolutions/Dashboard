import {
  Title,
  Text,
  Button,
  Container,
  useMantineTheme,
  Group,
  Space,
  Divider,
} from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import Link from 'next/link';

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
          Financial Analysis &
        </Title>
        <Title c="black" style={{ textAlign: 'center' }}>
          Categorization Tool (FACT)
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
          <Group component="span" gap={0} style={{ display: 'inline-flex' }}>
            <Text component="span" inherit c="black">
              What is{'\u00A0'}
            </Text>
            {/* <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{
                from: '#1A1C27',
                to: '#44c5f8',
              }}
            ></Text> */}
            <Text component="span" inherit c="black" fs={'italic'}>
              FACT
            </Text>
            {'\u00A0'}?
          </Group>
        </Text>

        <Container p={0} size={600}>
          <Divider my="md" color={theme.colors.dark[9]} />
          <Text size="lg" c={theme.colors.dark[9]} fw={500} className={classes.description}>
            FACT takes all of your client's bank statements and categorizes all of its transactions
            using state of the art Machine Learning technology. With an easy to use interface that
            streamlines the process, increasing categorization efficiency, centralizing client
            information, and allowing for faster Financial Analysis.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component={Link}
            href="/classification" // Your external link
            className={classes.control}
            bg={'#44c5f8'}
            size="lg"
            variant="default"
          >
            <Text fw={500} c={'white'}>
              Start Classifying...
            </Text>
          </Button>
        </div>
      </div>
    </Container>
  );
}

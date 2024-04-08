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
import { IconExternalLink } from '@tabler/icons-react';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import { bioRhyme } from '@/lib/utils/fonts';

export default function HeroText() {
  const theme = useMantineTheme();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title c="white" className={bioRhyme.className} style={{ textAlign: 'center' }}>
          Interdisciplinary{' '}
          <Text
            component="span"
            className={classes.highlight}
            inherit
            variant="gradient"
            gradient={{
              from: theme.colors['irene-orange'][4],
              to: theme.colors.yellow[6],
            }}
          >
            Research
          </Text>{' '}
          Network Extension
        </Title>
        <Space h="xl" />
        <Text
          c="white"
          size="24px"
          mb={5}
          className={bioRhyme.className}
          style={{ textAlign: 'center' }}
        >
          Welcome to{' '}
          <Group
            component="span"
            gap={0}
            style={{ display: 'inline-flex', alignItems: 'baseline' }}
          >
            <Text component="span" inherit c="white" className={bioRhyme.className}>
              I
            </Text>
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{
                from: theme.colors['irene-orange'][4],
                to: theme.colors.yellow[6],
              }}
              className={bioRhyme.className}
            >
              Re
            </Text>
            <Text component="span" inherit c="white" className={bioRhyme.className}>
              NE
            </Text>
          </Group>
        </Text>

        <Container p={0} size={600}>
          <Divider my="md" color={theme.colors.dark[3]} />
          <Text size="lg" c={theme.colors.gray[3]} fw={500} className={classes.description}>
            IReNE is a web application designed to streamline the creation and retrieval of case
            studies on the diverse impacts of natural disasters on Puerto Rico&apos;s
            infrastructure. Developed by students from the University of Puerto Rico, the
            application supports creating, searching, and editing case studies. It serves the
            RISE-UP initiative by facilitating documentation, collaboration, and information sharing
            aimed at fostering the development of more resilient infrastructure in Puerto Rico.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component="a"
            href="https://riseup.upr.edu/" // Your external link
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // For security reasons
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            rightSection={<IconExternalLink size={20} />}
          >
            Learn more about RISE-UP
          </Button>
        </div>
      </div>
    </Container>
  );
}

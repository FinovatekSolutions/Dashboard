import {
  Text,
  Container,
  Group,
  SimpleGrid,
  Anchor,
  Stack,
  Title,
  useMantineTheme,
  Center,
} from '@mantine/core';
import Image from 'next/image';
import classes from './HomeFooter.module.css';

export function HomeFooter() {
  const theme = useMantineTheme();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt={50}>
          <Center>
            <Anchor href="https://www.nsf.gov/" target="_blank" rel="noopener noreferrer">
              <Group h="100%" gap={10}>
                <Image
                  src="/nsf.png"
                  alt="National Science Foundation Logo"
                  width={200}
                  height={200}
                />
              </Group>
            </Anchor>
          </Center>

          <Stack gap={4}>
            <Title c={theme.colors.gray[4]} order={3}>
              Acknowledgment
            </Title>
            <Text size="lg" c={theme.colors.gray[4]} fw={500}>
              This material is based upon work supported by the National Science Foundation under
              grants No. HSI #1832468 and 1832427 (HSI program)
            </Text>
          </Stack>
          <Stack gap={4}>
            <Title c={theme.colors.gray[4]} order={3}>
              Disclaimer
            </Title>
            <Text size="lg" c={theme.colors.gray[4]} fw={500}>
              Any opinions, findings, and conclusions or recommendations expressed in this material
              are those of the authors and do not necessarily reflect the views of the National
              Science Foundation.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          &copy; {new Date().getFullYear()} RISE-UP. All Rights Reserved.
        </Text>
      </Container>
    </footer>
  );
}

'use client';

import {
  Anchor,
  Button,
  Text,
  AppShell,
  Burger,
  Group,
  Skeleton,
  useMantineTheme,
  Divider,
  Stack,
  Space,
  rem,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
// import Image from 'next/image';
import Link from 'next/link';
import classes from './AdminNavBar.module.css';
import { UserMenu } from '../UserMenu/UserMenu';

export function AdminNavBar({ children }: { children: any }) {
  const theme = useMantineTheme();
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <AppShell
        header={{ height: { base: rem(60), sm: rem(90) } }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        withBorder={false}
        styles={{
          header: {
            backgroundColor: '#1A1C27',
            marginBottom: '12px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
          navbar: {
            backgroundColor: theme.colors.dark[7],
          },
        }}
      >
        <AppShell.Header>
          <Group justify="space-between" h="100%" px="md">
            <Group h="100%" gap={10}>
              <Burger
                color={theme.colors.gray[2]}
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
              <Burger
                color={theme.colors.gray[2]}
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
              />
              <Space />
              <Image
                src="/trustmd-tree.png"
                alt="TrustMD Logo"
                w={{ base: 30, sm: 40 }}
                h={{ base: 30, sm: 40 }}
              />
              <Text c={theme.colors.gray[2]}>Admin Dashboard</Text>
            </Group>
            <Group>
              <UserMenu />
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Text c={theme.colors.gray[2]}>Navigation</Text>

          <Divider my="md" color={theme.colors.dark[3]} />
          <Button component={Link} href="/" color="teal" size="md">
            Return to Home
          </Button>
          <Divider my="md" color={theme.colors.dark[3]} />
          <Stack>
            <Button
              component={Link}
              href="/admin"
              color="teal"
              variant="subtle"
              size="md"
              onClick={closeMobile}
            >
              General
            </Button>
            <Button
              component={Link}
              href="/admin/permissions"
              color="teal"
              variant="subtle"
              size="md"
              onClick={closeMobile}
            >
              Permissions
            </Button>
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Space h="sm" />
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}

'use client';

import {
  AppShell,
  Burger,
  Group,
  rem,
  Space,
  UnstyledButton,
  useMantineTheme,
  Image,
  Text,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import Link from 'next/link';
import classes from './HomeNavBar.module.css';

import { UserMenu } from '@/components/user/general/UserMenu/UserMenu';

export function HomeNavBar({ children }: { children: any }) {
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/clients', label: 'Clients' },
  ];

  const renderLinks = navLinks.map((link) => (
    <UnstyledButton
      key={link.label}
      href={link.href}
      component={Link}
      className={classes.control}
      onClick={close}
    >
      {link.label}
    </UnstyledButton>
  ));

  return (
    <AppShell
      header={{ height: { base: rem(60), sm: rem(90) } }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      styles={{
        header: {
          backgroundColor: '#1A1C27',
          marginBottom: '12px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          borderBottom: `1px solid ${theme.colors.gray[7]}`, // Change '#FF5733' to your desired border color
        },
        navbar: {
          backgroundColor: '#1A1C27',
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            color={theme.colors.gray[2]}
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify="space-between" style={{ flex: 1 }}>
            {/* <MantineLogo size={30} /> */}
            <Group>
              <Anchor href="/" component={Link} style={{ textDecoration: 'none' }}>
                <Group gap={5}>
                  <Image
                    src="/trustmd-full-logo.webp"
                    alt="TrustMD Logo"
                    w={{ base: 113, sm: 225 }}
                    h={{ base: 32, sm: 63 }}
                    visibleFrom="sm"
                  />
                  <Image
                    src="/trustmd-tree.png"
                    alt="TrustMD Logo"
                    w={{ base: 30, sm: 40 }}
                    h={{ base: 30, sm: 40 }}
                    hiddenFrom="sm"
                  />
                  <Group gap={0}>
                    <Text size="xl" c="white" style={{ fontFamily: 'TrustMDFont' }} hiddenFrom="sm">
                      TRUST
                    </Text>
                    <Text
                      size="xl"
                      c={theme.colors['trust-md-light-blue'][4]}
                      style={{ fontFamily: 'TrustMDFont' }}
                      hiddenFrom="sm"
                    >
                      MD
                    </Text>
                  </Group>
                </Group>
              </Anchor>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {renderLinks}
              </Group>
            </Group>
            <UserMenu />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {renderLinks}
      </AppShell.Navbar>

      <AppShell.Main>
        <Space h="sm" />
        {children}
        <Space h="sm" hiddenFrom="sm" />
      </AppShell.Main>
    </AppShell>
  );
}

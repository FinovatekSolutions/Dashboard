'use client';

import {
  AppShell,
  Burger,
  Group,
  rem,
  Space,
  UnstyledButton,
  useMantineTheme,
  Text,
  Anchor,
  Box,
  Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { IconChartDots3 } from '@tabler/icons-react';

import classes from './HomeNavBar.module.css';

import { UserMenu } from '@/components/user/general/UserMenu/UserMenu';
import { bioRhyme } from '@/lib/utils/fonts';

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
      withBorder={false}
      styles={{
        header: {
          backgroundColor: theme.colors['irene-dark-blue'][9],
          marginBottom: '12px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        navbar: {
          backgroundColor: theme.colors['irene-dark-blue'][9],
          borderTop: `1px solid ${theme.colors.gray[7]}`, // Change '#FF5733' to your desired border color
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
                  <Box ml={5} visibleFrom="sm">
                    <Center>
                      <IconChartDots3 color={theme.colors.orange[7]} size={50} stroke={1.4} />
                    </Center>
                  </Box>
                  <Box hiddenFrom="sm">
                    <Center>
                      <IconChartDots3
                        color={theme.colors.orange[7]}
                        size={35}
                        stroke={1.7}
                      />
                    </Center>
                  </Box>

                  <Group gap={0}>
                    <Text size="1.7rem" c="white" className={bioRhyme.className}>
                      I
                    </Text>
                    <Text
                      size="1.7rem"
                      variant="gradient"
                      gradient={{
                        from: theme.colors['irene-orange'][4],
                        to: theme.colors.yellow[6],
                      }}
                      className={bioRhyme.className}
                    >
                      Re
                    </Text>
                    <Text size="1.7rem" c="white" className={bioRhyme.className}>
                      NE
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
        {children}
        <Space h="sm" hiddenFrom="sm" />
      </AppShell.Main>
    </AppShell>
  );
}

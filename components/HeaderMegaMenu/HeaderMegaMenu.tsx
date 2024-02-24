'use client';

import React from 'react';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronDown } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';
import { UserMenu } from '@/components/UserMenu/UserMenu';

export function HeaderMegaMenu() {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  // Define the links in a single array for reuse
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/todos', label: 'Todos' },
    { href: '/flask', label: 'Flask' },
  ];

  // Render links for both mobile and desktop
  const renderLinks = navLinks.map((link) => (
    <Anchor
      key={link.label}
      href={link.href}
      component={Link}
      className={classes.link}
      onClick={closeDrawer} // Close the drawer when a link is clicked on mobile
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Box pb={12}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={30}>
            <Anchor href="/" component={Link} className={classes.linklogo}>
              <Group h="100%" gap={10}>
                <Image src="/trustmd-full-logo.webp" alt="TrustMD Logo" width={225} height={63} />
              </Group>
            </Anchor>
            <Group h="100%" gap={0} visibleFrom="sm">
              {renderLinks}
            </Group>
          </Group>

          <Group visibleFrom="sm">
            {!session ? (
              <Button variant="default" onClick={() => signIn()}>
                Sign in
              </Button>
            ) : (
              <UserMenu />
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {renderLinks}
          <Divider my="sm" />
          {!session ? (
            <Button fullWidth onClick={() => signIn()}>
              Sign in
            </Button>
          ) : (
            <UserMenu />
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

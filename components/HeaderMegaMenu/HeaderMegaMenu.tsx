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
  Avatar, // Make sure to import Avatar
} from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronDown } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import classes from './HeaderMegaMenu.module.css';
import { UserMenu } from '@/components/UserMenu/UserMenu';

export function HeaderMegaMenu() {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/todos', label: 'Todos' },
    { href: '/flask', label: 'Flask' },
  ];

  const renderLinks = navLinks.map((link) => (
    <Anchor
      key={link.label}
      href={link.href}
      component={Link}
      className={classes.link}
      onClick={closeDrawer}
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

          {/* Replace Burger with Avatar if session exists */}
          {session ? (
            <Avatar
              src={session?.user?.image}
              alt={session?.user?.name || ''}
              radius="xl"
              size={45}
              mr={10}
              imageProps={{ referrerPolicy: 'no-referrer' }}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          ) : (
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          )}
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

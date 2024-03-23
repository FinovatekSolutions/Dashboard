'use client';

import React from 'react';
import {
  Group,
  Button,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  Avatar,
  Stack,
  Space,
} from '@mantine/core';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderMegaMenu.module.css';
import { UserMenu } from '@/components/user/general/UserMenu/UserMenu';

export function HeaderMegaMenu() {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/clients', label: 'Clients' },
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
              className={classes.customavatarhover}
            />
          ) : (
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              color={theme.colors.gray[2]}
              size="md"
            />
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
        zIndex={999999}
        styles={{
          header: {
            backgroundColor: '#1A1C27',
            color: theme.colors.gray[2],
          },
          body: {
            backgroundColor: '#1A1C27',
          },
        }}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Stack h={`calc(100vh - ${rem(80)})`} justify="space-between">
            <Box>
              <Divider my="sm" color={theme.colors.gray[7]} />
              <Space h="md" />
              {renderLinks}
            </Box>
            <Box>
              <Divider my="sm" color={theme.colors.gray[7]} />
              <Center>
                {!session ? (
                  <Button fullWidth size="md" variant="default" w="95%" onClick={() => signIn()}>
                    Sign in
                  </Button>
                ) : (
                  <UserMenu fullWidth closeDrawer={closeDrawer} />
                )}
              </Center>
            </Box>
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

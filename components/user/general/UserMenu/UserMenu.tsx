import cx from 'clsx';
import { useState } from 'react';
import { Avatar, UnstyledButton, Group, Text, Menu, rem, useMantineTheme } from '@mantine/core';
import {
  IconLogout,
  IconChevronDown,
  IconChevronUp,
  IconShieldCog,
  IconLayoutDashboard,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

import classes from './UserMenu.module.css';

import { useGetPermissionByEmail } from '@/lib/actions/permission';

// Define the props with TypeScript
interface UserMenuProps {
  fullWidth?: boolean; // Optional prop
  closeDrawer?: () => void; // Optional function prop
}

export function UserMenu({ fullWidth = false, closeDrawer }: UserMenuProps) {
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const getPermissionQuery = useGetPermissionByEmail(session?.user?.email || '');

  return (
    <Menu
      width={fullWidth ? '95%' : 260}
      position="bottom-end"
      transitionProps={{ transition: fullWidth ? 'pop-bottom-left' : 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
      zIndex={1000000}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          style={{ width: fullWidth ? '95%' : 'auto' }}
        >
          <Group gap={7}>
            <Avatar
              src={session?.user?.image}
              alt={session?.user?.name || ''}
              radius="xl"
              size={30}
              imageProps={{ referrerPolicy: 'no-referrer' }}
            />
            <Text fw={500} size="md" lh={1} mr={3} visibleFrom="sm">
              {session?.user?.name}
            </Text>
            {fullWidth ? (
              <IconChevronUp style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
            ) : (
              <IconChevronDown style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>General</Menu.Label>
        <Menu.Item
          leftSection={
            <IconLayoutDashboard style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
          component={Link}
          href="/my-reviews"
        >
          My Reviews
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label display={getPermissionQuery.data?.role !== Role.ADMIN ? 'none' : undefined}>
          Admin
        </Menu.Label>
        <Menu.Item
          leftSection={
            <IconShieldCog
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.orange[6]}
              stroke={1.5}
            />
          }
          component={Link}
          href="/admin"
          display={getPermissionQuery.data?.role !== Role.ADMIN ? 'none' : undefined}
        >
          Admin Dashboard
        </Menu.Item>
        <Menu.Divider display={getPermissionQuery.data?.role !== Role.ADMIN ? 'none' : undefined} />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          component={Link}
          onClick={() => closeDrawer && closeDrawer()}
          href="/profile"
        >
          Profile
        </Menu.Item>

        <Menu.Item
          onClick={async () => {
            await signOut();
            if (closeDrawer) closeDrawer();
          }}
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

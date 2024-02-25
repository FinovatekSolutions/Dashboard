import cx from 'clsx';
import { useState } from 'react';
import { Avatar, UnstyledButton, Group, Text, Menu, rem, useMantineTheme } from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconFiles,
  IconUser,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import classes from './UserMenu.module.css';

// Define the props with TypeScript
interface UserMenuProps {
  fullWidth?: boolean; // Optional prop
  closeDrawer?: () => void; // Optional function prop
}

export function UserMenu({ fullWidth = false, closeDrawer }: UserMenuProps) {
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={fullWidth ? '100%' : 260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
      zIndex={1000000}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          style={{ width: fullWidth ? '100%' : 'auto' }}
        >
          <Group gap={7}>
            <Avatar
              src={session?.user?.image}
              alt={session?.user?.name || ''}
              radius="xl"
              size={30}
              imageProps={{ referrerPolicy: 'no-referrer' }}
            />
            <Text fw={500} size="md" lh={1} mr={3}>
              {session?.user?.name}
            </Text>
            <IconChevronDown style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>General</Menu.Label>
        <Menu.Item
          leftSection={
            <IconFiles
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
          component={Link}
          onClick={() => closeDrawer && closeDrawer()}
          href="/my-documents"
        >
          My Documents
        </Menu.Item>
        <Menu.Divider />
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

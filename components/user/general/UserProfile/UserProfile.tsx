import { Avatar, Text, Group, Title, Tooltip } from '@mantine/core';
import { IconAt, IconUserCircle } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

import { useGetPermissionByEmail } from '@/lib/actions/permission';

import classes from './UserProfile.module.css';

export function UserProfile() {
  const { data: session } = useSession();
  const getPermissionQuery = useGetPermissionByEmail(session?.user?.email || '');

  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={session?.user?.image} size="7rem" radius="md" />
        <div>
          <Text fz="md" tt="uppercase" fw={500} c="dimmed">
            User Information
          </Text>

          <Title order={2} fw={500} className={classes.nameWrap}>
            {session?.user?.name}
          </Title>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Tooltip label="Email">
              <IconAt stroke={1.5} size="1.2rem" className={classes.icon} />
            </Tooltip>
            <Text fz="sm" c="dimmed">
              {session?.user?.email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Tooltip label="Role">
              <IconUserCircle stroke={1.5} size="1.2rem" className={classes.icon} />
            </Tooltip>
            <Text fz="sm" c="dimmed">
              {getPermissionQuery.data?.role.charAt(0)}
              {getPermissionQuery.data?.role.slice(1).toLowerCase()}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
